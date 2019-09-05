import { TestBed, inject } from '@angular/core/testing';
import { TramitesService } from './tramites.service';
import { TestingModule, LoginService } from '../../../testing.module';

describe('Tramites por Area', () => {

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [TramitesService],
            imports: [TestingModule]
        });
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([TramitesService], (service: TramitesService) => {
        expect(service).toBeTruthy();
    }));

    it('should get tramites list', (done: DoneFn) => {
        const service: TramitesService = TestBed.get(TramitesService);
        const organismoId = 1;
        const areaId = 2;

        service.getTramites(organismoId, areaId).subscribe((resultado: TramitesPaginables) => {
            expect(resultado.tramites.length).toBeDefined();
            if (resultado.tramites.length > 0) {
                expect(resultado.tramites[0]).not.toBeNull();
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




