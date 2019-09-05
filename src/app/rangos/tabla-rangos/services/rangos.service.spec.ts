import { TestBed, inject } from '@angular/core/testing';
import { RangosService } from './rangos.service';
import { TestingModule, LoginService } from '../../../testing.module';

describe('RangosService', () => {

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [RangosService],
            imports: [TestingModule]
        });
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([RangosService],
        (rangosService: RangosService) => {
        expect(rangosService).toBeTruthy();
    }));

    it('should get rangos list', (done: DoneFn) => {
        const rangoService: RangosService = TestBed.get(RangosService);
        const organismoId = 1;
        const areaId = 1;

        rangoService.getAllRangos(organismoId, areaId).subscribe((resultado: RangosPaginables) => {
            expect(resultado.rangos.length).toBeGreaterThanOrEqual(0);
            expect(resultado.rangos[0]).not.toBeNull();
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
