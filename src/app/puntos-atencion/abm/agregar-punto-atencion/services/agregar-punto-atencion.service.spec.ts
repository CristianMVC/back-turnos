import { TestBed, inject } from '@angular/core/testing';
import { AgregarPuntoAtencionService } from './agregar-punto-atencion.service';
import { EliminarPuntoAtencionService } from '../../eliminar-punto-atencion/services/eliminar-punto-atencion.service';
import { AbmOrganismoModule } from '../../../../organismos/abm/abm-organismo.module';
import { AbmAreasModule } from '../../../../areas/abm/abm-area.module';
import { TestHelperPuntoAtencion } from './test-utilities';
import { TestingModule, LoginService } from '../../../../testing.module';

describe('AgregarPuntoAtencionService, EliminarPuntoAtencionService', () => {

    let originalTimeout: number;

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [AgregarPuntoAtencionService, EliminarPuntoAtencionService, TestHelperPuntoAtencion],
            imports: [TestingModule, AbmOrganismoModule, AbmAreasModule]
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000; // tslint:disable-line:no-magic-numbers
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([AgregarPuntoAtencionService, EliminarPuntoAtencionService],
        (agregarService: AgregarPuntoAtencionService, eliminarService: EliminarPuntoAtencionService) => {
            expect(agregarService).toBeTruthy();
            expect(eliminarService).toBeTruthy();
    }));

    it('should add / edit / remove punto de atencion', (done: DoneFn) => {
        const testHelper = TestBed.get(TestHelperPuntoAtencion);
        const expectedCode = 200;

        return testHelper.createNuevoOrganismo().subscribe((addOrganismoResponse: any) => {
            const organismoId = addOrganismoResponse.additional.id;

            return testHelper.createNuevoArea(organismoId).subscribe((addAreaResponse: any) => {
                const areaId = addAreaResponse.additional.id;

                const agregarPuntoAtencionService: AgregarPuntoAtencionService = TestBed.get(AgregarPuntoAtencionService);
                const eliminarPuntoAtencionService: EliminarPuntoAtencionService = TestBed.get(EliminarPuntoAtencionService);
                const nuevoPDA = testHelper.createNuevoPuntoAtencion(areaId);

                agregarPuntoAtencionService.agregarPuntoAtencion(nuevoPDA).subscribe((addPdaResponse: any) => {
                    const pdaId = addPdaResponse.additional.id;
                    expect(addPdaResponse.code).toBe(expectedCode);
                    expect(typeof pdaId).toEqual('number');
                    expect(pdaId).toBeGreaterThan(0);

                    const pdaEditar = testHelper.createPuntoAtencionEditar(areaId, pdaId);
                    agregarPuntoAtencionService.editarPuntoAtencion(pdaEditar).subscribe((editResponse: any) => {
                        expect(editResponse.code).toBe(expectedCode);

                        eliminarPuntoAtencionService.eliminarPuntoAtencion(pdaId).subscribe((deletePdaResponse: any) => {
                            expect(deletePdaResponse.code).toBe(expectedCode);

                            testHelper.eliminarArea(organismoId, areaId).subscribe((deleteAreaResponse: any) => {
                                testHelper.eliminarOrganismo(organismoId).subscribe((deleteOrganismoResponse: any) => {
                                    done();
                                }, ((err: Error) => { done.fail(err); }));
                            }, ((err: Error) => { done.fail(err); }));
                        }, ((err: Error) => { done.fail(err); }));
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
