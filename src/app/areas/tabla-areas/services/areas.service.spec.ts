import { TestBed, inject } from '@angular/core/testing';
import { AreasService } from './areas.service';
import { OrganismosService } from '../../../organismos/organismos.module';
import { TestingModule, LoginService } from '../../../testing.module';

describe('AreasService', () => {

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [AreasService, OrganismosService, LoginService],
            imports: [TestingModule]
        });
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([AreasService, OrganismosService],
        (areaService: AreasService, orgService: OrganismosService) => {
        expect(areaService).toBeTruthy();
        expect(orgService).toBeTruthy();
    }));

    it('should get areas list', (done: DoneFn) => {
        const areaService: AreasService = TestBed.get(AreasService);
        const orgService: OrganismosService = TestBed.get(OrganismosService);

        orgService.getOrganismos().subscribe((org: OrganismosPaginables) => {
            expect(org.organismos.length).toBeGreaterThan(0);
            expect(org.organismos[0]).not.toBeNull();
            const organismoId: number = org.organismos[0].id;
            expect(typeof organismoId).toBe('number');

            areaService.getAreas(organismoId).subscribe((resultado: AreasPaginables) => {
                expect(resultado.areas.length).toBeGreaterThanOrEqual(0);
                expect(resultado.areas[0]).not.toBeNull();
                done();
            }, ((err: Error) => {
                done.fail(err);
            }));
        }, ((err: Error) => {
            done.fail(err);
        }));
    });

    afterEach((done: DoneFn) => {
        const service: LoginService = TestBed.get(LoginService);
        return service.logout().subscribe(done);
    });

});
