import { TestBed, inject } from '@angular/core/testing';
import { CapacidadService } from './capacidad.service';
import { TestingModule, LoginService } from '../../../../testing.module';

describe('CapacidadService', () => {

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [CapacidadService],
            imports: [TestingModule]
        });
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([CapacidadService], (service: CapacidadService) => {
        expect(service).toBeTruthy();
    }));

    it('should get capacidad list / set capacidad', (done: DoneFn) => {
        const service: CapacidadService = TestBed.get(CapacidadService);
        const puntoId = 3;
        const grupoId = 87;

        service.getCapacidad(puntoId, grupoId).subscribe((capacidadResponse: Disponibilidad[]) => {
            expect(capacidadResponse.length).toBeGreaterThanOrEqual(0);
            if (capacidadResponse.length === 0) {
                done();
            } else {
                const successCode = 200;
                const idRow = capacidadResponse[0].idRow;
                const cantTurnos = capacidadResponse[0].cantidadTurnos;
                expect(idRow).toBeDefined();
                expect(cantTurnos).toBeGreaterThanOrEqual(0);

                service.setCapacidad(puntoId, grupoId, cantTurnos, idRow)
                    .subscribe((setResponse: any) => {
                        expect(setResponse.code).toBe(successCode);
                        done();
                }, ((err: Error) => { done.fail(err); }));
            }
        }, ((err: Error) => { done.fail(err); }));
    });

    afterEach((done: DoneFn) => {
        const service: LoginService = TestBed.get(LoginService);
        return service.logout().subscribe(done);
    });
});




