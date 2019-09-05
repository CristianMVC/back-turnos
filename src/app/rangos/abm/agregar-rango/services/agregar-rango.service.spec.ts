import { TestBed, inject } from '@angular/core/testing';
import { PuntosAtencionModule } from '../../../../puntos-atencion/puntos-atencion.module';
import { AgregarRangoService } from './agregar-rango.service';
import { EliminarRangoService } from '../../eliminar-rango/services/eliminar-rango.service';
import { TestHelperRango } from './test-utilities';
import { TestingModule, LoginService } from '../../../../testing.module';

describe('AgregarRangoService, EliminarRangoService', () => {

    let originalTimeout: number;

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [AgregarRangoService, EliminarRangoService, TestHelperRango],
            imports: [TestingModule, PuntosAtencionModule]
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000; // tslint:disable-line:no-magic-numbers
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([AgregarRangoService, EliminarRangoService],
        (agregarService: AgregarRangoService, eliminarService: EliminarRangoService) => {
            expect(agregarService).toBeTruthy();
            expect(eliminarService).toBeTruthy();
    }));

    it('should get rangos horarios', (done: DoneFn) => {
        const agregarRangoService: AgregarRangoService = TestBed.get(AgregarRangoService);
        agregarRangoService.getRangoHorario().subscribe((rangoHorarioResponse: RangoHorario) => {
            expect(rangoHorarioResponse.length).toBeGreaterThan(0);
            done();
        }, ((err: Error) => { done.fail(err); }));
    });

    it('should add / edit / remove rango', (done: DoneFn) => {
        const testHelper = TestBed.get(TestHelperRango);
        const expectedCode = 200;

        testHelper.getPuntosAtencion().subscribe((puntosResponse: any) => {
            expect(puntosResponse.puntosAtencion.length).toBeGreaterThan(0);
            const puntoId = puntosResponse.puntosAtencion[0].id;
            const agregarRangoService: AgregarRangoService = TestBed.get(AgregarRangoService);
            const eliminarRangoService: EliminarRangoService = TestBed.get(EliminarRangoService);
            const nuevoRango = testHelper.createNuevoRango();

            agregarRangoService.agregarRango(puntoId, nuevoRango).subscribe((addRangoResponse: any) => {
                const rangoId = addRangoResponse.additional.id;
                expect(addRangoResponse.code).toBe(expectedCode);
                expect(typeof rangoId).toEqual('number');
                expect(rangoId).toBeGreaterThan(0);

                const rangoEditar = testHelper.createRangoEditar(rangoId);
                agregarRangoService.editarRango(puntoId, rangoEditar).subscribe((editResponse: any) => {
                    expect(editResponse.code).toBe(expectedCode);

                    eliminarRangoService.eliminarRango(puntoId, rangoId).subscribe((deleteRangoResponse: any) => {
                        expect(deleteRangoResponse.code).toBe(expectedCode);
                        done();
                    }, ((err: Error) => { done.fail(err); }));
                }, ((err: Error) => { done.fail(err); }));
            }, ((err: Error) => { done.fail(err); }));
        }, ((err: Error) => { done.fail(err); }));
    });

     afterEach((done: DoneFn) => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      const service: LoginService = TestBed.get(LoginService);
      return service.logout().subscribe(done);
    });

});
