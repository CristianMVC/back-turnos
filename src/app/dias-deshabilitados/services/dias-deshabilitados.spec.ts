import { TestBed, inject } from '@angular/core/testing';
import { DiasDeshabilitadosService } from './dias-deshabilitados.service';
import { TestHelperGrupoTramites, TestContext } from '../../grupo-tramites/abm/agregar-grupo-tramites/services/test-utilities';
import { AbmOrganismoModule } from '../../organismos/abm/abm-organismo.module';
import { AbmAreasModule } from '../../areas/abm/abm-area.module';
import { AbmPuntosAtencionModule } from '../../puntos-atencion/abm/abm-punto-atencion.module';
import { AbmTramiteModule } from '../../tramites/abm/abm-tramite.module';
import { TestHelperTramite } from '../../tramites/abm/agregar-tramite/services/test-utilities';
import { TestingModule, LoginService } from '../../testing.module';

import * as moment from 'moment';

describe('DiasDeshabilitadosService', () => {

    let originalTimeout: number;

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [DiasDeshabilitadosService, TestHelperGrupoTramites, TestHelperTramite],
            imports: [TestingModule, AbmOrganismoModule, AbmAreasModule, AbmPuntosAtencionModule, AbmTramiteModule]
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000; // tslint:disable-line:no-magic-numbers
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([DiasDeshabilitadosService],
        (diasDeshabilitadosService: DiasDeshabilitadosService) => {
            expect(diasDeshabilitadosService).toBeTruthy();
        }
    ));

    it('should get dias deshabilitados list', (done: DoneFn) => {
        const diasDeshabilitadosService: DiasDeshabilitadosService = TestBed.get(DiasDeshabilitadosService);
        const testHelper = TestBed.get(TestHelperGrupoTramites);

        return testHelper.createContext().subscribe((result: TestContext) => {
            return diasDeshabilitadosService.getDiasDeshabilitados(result.puntoId).subscribe((resultado: any) => {
                expect(resultado).not.toBe(null);
                done();
            }, ((err: Error) => {
                done.fail(err);
            }));
        }, ((err: Error) => { done.fail(err); }));
    });

    it('should add / delete dias deshabilitados', (done: DoneFn) => {
        const diasDeshabilitadosService: DiasDeshabilitadosService = TestBed.get(DiasDeshabilitadosService);
        const testHelper = TestBed.get(TestHelperGrupoTramites);
        const today = moment().format('YYYY-MM-DD');

        return testHelper.createContext().subscribe((result: TestContext) => {

            return diasDeshabilitadosService.deshabilitarDia(result.puntoId, today).subscribe((addResponse: any) => {
                const expectedCode = 200;
                expect(addResponse.code).toBe(expectedCode);
                return diasDeshabilitadosService.eliminarDiaDeshabilitado(result.puntoId, today).subscribe((deleteResponse: any) => {
                    expect(deleteResponse.code).toBe(expectedCode);
                    done();
                }, ((err: Error) => { done.fail(err); }));
            }, ((err: Error) => { done.fail(err); }));
        });
    });

    afterEach((done: DoneFn) => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      const service: LoginService = TestBed.get(LoginService);
      return service.logout().subscribe(done);
    });

});
