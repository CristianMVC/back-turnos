import { TestBed, inject } from '@angular/core/testing';
import { GrupoTramitesService } from './grupo-tramites.service';
import { TestingModule, LoginService } from '../../../testing.module';

describe('GrupoTramitesService', () => {

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [GrupoTramitesService],
            imports: [TestingModule]
        });
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([GrupoTramitesService], (service: GrupoTramitesService) => {
        expect(service).toBeTruthy();
    }));

    it('should get grupoTramites list', (done: DoneFn) => {
        const service: GrupoTramitesService = TestBed.get(GrupoTramitesService);
        const puntoAtencionId = 1;

        service.getGrupoTramites(puntoAtencionId).subscribe((resultado: GrupoTramitesPaginables) => {
            expect(resultado.grupos.length).toBeGreaterThanOrEqual(0);
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




