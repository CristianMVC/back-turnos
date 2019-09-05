import { TestBed, inject } from '@angular/core/testing';
import { CalendarioService } from './calendario.service';
import { TestingModule, LoginService } from '../../testing.module';

import * as moment from 'moment';

describe('CalendarioService', () => {

    let originalTimeout: number;

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [CalendarioService, LoginService],
            imports: [TestingModule]
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000; // tslint:disable-line:no-magic-numbers
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([CalendarioService],
        (calendarioService: CalendarioService) => {
            expect(calendarioService).toBeTruthy();
        }
    ));

    it('should get feriados list', (done: DoneFn) => {
        const calendarioService: CalendarioService = TestBed.get(CalendarioService);

        calendarioService.getFeriados().subscribe((resultado: any) => {
            expect(resultado).not.toBe(null);
            done();
        }, ((err: Error) => {
            done.fail(err);
        }));
    });

    it('should add / delete feriado nacional', (done: DoneFn) => {
        const calendarioService: CalendarioService = TestBed.get(CalendarioService);
        const day = moment().add(1, 'year').format('YYYY-MM-DD');

        calendarioService.agregarFeriadoNacional(day).subscribe((addResponse: any) => {
            const expectedCode = 200;
            expect(addResponse.code).toBe(expectedCode);
            calendarioService.eliminarFeriadoNacional(day).subscribe((deleteResponse: any) => {
                expect(deleteResponse.code).toBe(expectedCode);
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
