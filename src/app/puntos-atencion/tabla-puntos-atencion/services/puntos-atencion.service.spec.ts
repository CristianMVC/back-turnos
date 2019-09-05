import { TestBed, inject } from '@angular/core/testing';
import { PuntosAtencionService } from './puntos-atencion.service';
import { TestingModule, LoginService } from '../../../testing.module';

describe('PuntosAtencionService', () => {

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [PuntosAtencionService],
            imports: [TestingModule]
        });
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([PuntosAtencionService],
        (puntosAtencionService: PuntosAtencionService) => {
        expect(puntosAtencionService).toBeTruthy();
    }));

    it('should get puntos-atencion list', (done: DoneFn) => {
        const puntoAtencionService: PuntosAtencionService = TestBed.get(PuntosAtencionService);
        const organismoId = 1;
        const areaId = 1;

        puntoAtencionService.getPuntosAtencion(organismoId, areaId).subscribe((resultado: PuntosAtencionPaginables) => {
            expect(resultado.puntosAtencion.length).toBeDefined();
            if (resultado.puntosAtencion.length > 0) {
                expect(resultado.puntosAtencion.length).toBeGreaterThanOrEqual(0);
                expect(resultado.puntosAtencion[0]).not.toBeNull();
            }
            done();
        }, ((err: Error) => {
            done.fail(err);
        }));
    });

    afterEach((done: DoneFn) => {
        const service: LoginService = TestBed.get(LoginService);
        return service.logout().subscribe(done);
    });
});
