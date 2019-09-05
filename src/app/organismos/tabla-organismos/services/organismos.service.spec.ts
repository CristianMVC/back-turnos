import { TestBed, inject } from '@angular/core/testing';
import { OrganismosService } from './organismos.service';
import { TestingModule, LoginService } from '../../../testing.module';

describe('OrganismosService', () => {

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [OrganismosService],
            imports: [TestingModule]
        });
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([OrganismosService], (service: OrganismosService) => {
        expect(service).toBeTruthy();
    }));

    it('should get organismos list', (done: DoneFn) => {
        const service: OrganismosService = TestBed.get(OrganismosService);

        service.getOrganismos().subscribe((resultado: OrganismosPaginables) => {
            expect(resultado.organismos.length).toBeGreaterThan(0);
            expect(resultado.organismos[0]).not.toBeNull();
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




