import { TestBed, inject } from '@angular/core/testing';
import { AgregarCategoriaService } from './editar-tramite-pda.service';
import { EliminarCategoriaService } from '../../eliminar-categoria/services/eliminar-categoria.service';
import { AbmOrganismoModule } from '../../../../organismos/abm/abm-organismo.module';
import { AbmAreasModule } from '../../../../areas/abm/abm-area.module';
import { AbmPuntosAtencionModule } from '../../../../puntos-atencion/abm/abm-punto-atencion.module';
import { AbmTramiteModule } from '../../../../tramites/abm/abm-tramite.module';
import { TestHelperTramite } from '../../../../tramites/abm/agregar-tramite/services/test-utilities';
import { TestHelperCategoria, TestContext } from './test-utilities';
import { TestingModule, LoginService } from '../../../../testing.module';

describe('AgregarCategoriaService, EliminarCategoriaService', () => {

    let originalTimeout: number;

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [AgregarCategoriaService, EliminarCategoriaService, TestHelperCategoria, TestHelperTramite],
            imports: [TestingModule, AbmOrganismoModule, AbmAreasModule, AbmPuntosAtencionModule, AbmTramiteModule]
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000; // tslint:disable-line:no-magic-numbers
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([AgregarCategoriaService, EliminarCategoriaService],
        (agregarService: AgregarCategoriaService,
            eliminarService: EliminarCategoriaService) => {
            expect(agregarService).toBeTruthy();
            expect(eliminarService).toBeTruthy();
    }));

    it('should add / edit / remove categoria', (done: DoneFn) => {
        const testHelper: TestHelperCategoria = TestBed.get(TestHelperCategoria);
        const expectedCode = 200;

        return testHelper.createContext().subscribe((result: TestContext) => {
            const agregarCategoriaService: AgregarCategoriaService = TestBed.get(AgregarCategoriaService);
            const eliminarCategoriaService: EliminarCategoriaService = TestBed.get(EliminarCategoriaService);

            return agregarCategoriaService.getTramitesDisponibles(result.puntoId).subscribe((tramitesResponse: any) => {
                expect(tramitesResponse.length).toBeGreaterThan(0);
                const tramiteId = tramitesResponse[0].id;
                const nuevaCategoria = testHelper.createNuevoCategoria(result.puntoId, tramiteId);

                return agregarCategoriaService.agregarCategoria(result.puntoId, nuevaCategoria).subscribe((addGrupoResponse: any) => {
                    const grupoTramiteId = addGrupoResponse.additional.id;
                    expect(addGrupoResponse.code).toBe(expectedCode);
                    expect(typeof grupoTramiteId).toEqual('number');
                    expect(grupoTramiteId).toBeGreaterThan(0);

                    const grupoEditar = testHelper.createCategoriaEditar(result.puntoId, grupoTramiteId, tramiteId);
                    return agregarCategoriaService.editarCategoria(result.puntoId, grupoEditar).subscribe((editResponse: any) => {
                        expect(editResponse.code).toBe(expectedCode);

                        // tslint:disable-next-line
                        return eliminarCategoriaService.eliminarCategoria(result.puntoId, grupoTramiteId).subscribe((deleteResponse: any) => {
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

