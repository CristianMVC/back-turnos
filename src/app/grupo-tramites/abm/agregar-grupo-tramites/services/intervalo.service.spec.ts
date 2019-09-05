import { TestBed, inject } from '@angular/core/testing';
import { IntervaloService } from './intervalo.service';
import { TestingModule, LoginService } from '../../../../testing.module';

describe('IntervaloService', () => {

    let originalTimeout: number;

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [IntervaloService],
            imports: [TestingModule]
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000; // tslint:disable-line:no-magic-numbers
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([IntervaloService],
        (intervaloService: IntervaloService) => {
            expect(intervaloService).toBeTruthy();
    }));

    it('should get intervalo', (done: DoneFn) => {
        const intervaloService = TestBed.get(IntervaloService);
        const puntoAtencionId = 1;

        return intervaloService.getIntervaloDisponible(puntoAtencionId).subscribe((intervalo: number[]) => {
            expect(intervalo.length).toBeGreaterThan(0); // tslint:disable-line:no-magic-numbers
            expect(intervalo).toContain(15); // tslint:disable-line:no-magic-numbers
            expect(intervalo).toContain(30); // tslint:disable-line:no-magic-numbers
            expect(intervalo).toContain(60); // tslint:disable-line:no-magic-numbers
            done();
        }, (err: Error) => {done.fail(err)});
    });

    afterEach((done: DoneFn) => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      const service: LoginService = TestBed.get(LoginService);
      return service.logout().subscribe(done);
    });
});
