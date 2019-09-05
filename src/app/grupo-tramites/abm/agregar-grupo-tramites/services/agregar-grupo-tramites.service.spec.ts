import { TestBed, inject } from '@angular/core/testing';
import { AgregarGrupoTramitesService } from './agregar-grupo-tramites.service';
import { EliminarGrupoTramitesService } from '../../eliminar-grupo-tramites/services/eliminar-grupo-tramites.service';
import { AbmOrganismoModule } from '../../../../organismos/abm/abm-organismo.module';
import { AbmAreasModule } from '../../../../areas/abm/abm-area.module';
import { AbmPuntosAtencionModule } from '../../../../puntos-atencion/abm/abm-punto-atencion.module';
import { AbmTramiteModule } from '../../../../tramites/abm/abm-tramite.module';
import { TestHelperTramite } from '../../../../tramites/abm/agregar-tramite/services/test-utilities';
import { TestHelperGrupoTramites, TestContext } from './test-utilities';
import { TestingModule, LoginService } from '../../../../testing.module';

describe('AgregarGrupoTramiteService, EliminarGrupoTramiteService', () => {

    let originalTimeout: number;

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [AgregarGrupoTramitesService, EliminarGrupoTramitesService, TestHelperGrupoTramites, TestHelperTramite],
            imports: [TestingModule, AbmOrganismoModule, AbmAreasModule, AbmPuntosAtencionModule, AbmTramiteModule]
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000; // tslint:disable-line:no-magic-numbers
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([AgregarGrupoTramitesService, EliminarGrupoTramitesService],
        (agregarService: AgregarGrupoTramitesService,
            eliminarService: EliminarGrupoTramitesService) => {
            expect(agregarService).toBeTruthy();
            expect(eliminarService).toBeTruthy();
    }));

    it('should add / edit / remove grupo de tramites', (done: DoneFn) => {
        const testHelper: TestHelperGrupoTramites = TestBed.get(TestHelperGrupoTramites);
        const expectedCode = 200;

        return testHelper.createContext().subscribe((result: TestContext) => {
            const agregarGrupoTramitesService: AgregarGrupoTramitesService = TestBed.get(AgregarGrupoTramitesService);
            const eliminarGrupoTramitesService: EliminarGrupoTramitesService = TestBed.get(EliminarGrupoTramitesService);

            return agregarGrupoTramitesService.getTramitesDisponibles(result.puntoId).subscribe((tramitesResponse: any) => {
                expect(tramitesResponse.length).toBeGreaterThan(0);
                const tramiteId = tramitesResponse[0].id;
                const nuevoGrupo = testHelper.createNuevoGrupoTramites(result.puntoId, tramiteId);

                return agregarGrupoTramitesService.agregarGrupoTramites(result.puntoId, nuevoGrupo).subscribe((addGrupoResponse: any) => {
                    const grupoTramiteId = addGrupoResponse.additional.id;
                    expect(addGrupoResponse.code).toBe(expectedCode);
                    expect(typeof grupoTramiteId).toEqual('number');
                    expect(grupoTramiteId).toBeGreaterThan(0);

                    const grupoEditar = testHelper.createGrupoTramitesEditar(result.puntoId, grupoTramiteId, tramiteId);
                    return agregarGrupoTramitesService.editarGrupoTramites(result.puntoId, grupoEditar).subscribe((editResponse: any) => {
                        expect(editResponse.code).toBe(expectedCode);

                        // tslint:disable-next-line
                        return eliminarGrupoTramitesService.eliminarGrupoTramites(result.puntoId, grupoTramiteId).subscribe((deleteResponse: any) => {
                            expect(deleteResponse.code).toBe(expectedCode);

                            return testHelper.removeContext(result).subscribe(() => {
                                done();
                            }, ((err: Error) => { done.fail(err); }));
                        }, ((err: Error) => { done.fail(err); }));
                    }, ((err: Error) => { done.fail(err); }));
                }, ((err: Error) => { done.fail(err); }));
            }, ((err: Error) => { done.fail(err); }));
        }, ((err: Error) => { done.fail(err); }));
    });

    afterEach((done: DoneFn) => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      const service: LoginService = TestBed.get(LoginService);
      return service.logout().subscribe(done);
    });

});
