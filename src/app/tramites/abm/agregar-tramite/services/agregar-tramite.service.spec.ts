import { TestBed, inject } from '@angular/core/testing';
import { TestHelperTramite } from './test-utilities';
import { AbmOrganismoModule } from '../../../../organismos/abm/abm-organismo.module';
import { AreasModule } from '../../../../areas/areas.module';
import { AgregarTramiteService } from './agregar-tramite.service';
import { EliminarTramiteService } from '../../eliminar-tramite/services/eliminar-tramite.service';
import { TestingModule, LoginService } from '../../../../testing.module';

describe('AgregarTramiteService, EliminarTramiteService', () => {

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [AgregarTramiteService, EliminarTramiteService, TestHelperTramite],
            imports: [TestingModule, AreasModule, AbmOrganismoModule ]
        });
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([AgregarTramiteService, EliminarTramiteService, TestHelperTramite],
        (agregarService: AgregarTramiteService,
            eliminarService: EliminarTramiteService,
            testHelper: TestHelperTramite) => {
            expect(agregarService).toBeTruthy();
            expect(eliminarService).toBeTruthy();
            expect(testHelper).toBeTruthy();
    }));

    it('should add / edit / remove tramite', (done: DoneFn) => {
        const testHelper = TestBed.get(TestHelperTramite);
        const expectedCode = 200;

        return testHelper.createNuevoOrganismo().subscribe((addOrganismoResponse: any) => {
            const organismoId = addOrganismoResponse.additional.id;

            return testHelper.createNuevoArea(organismoId).subscribe((addAreaResponse: any) => {
                const areaId = addAreaResponse.additional.id;

                const agregarTramiteService: AgregarTramiteService = TestBed.get(AgregarTramiteService);
                const eliminarTramiteService: EliminarTramiteService = TestBed.get(EliminarTramiteService);
                const nuevoTramite = testHelper.createNuevoTramite(areaId);

                agregarTramiteService.agregarTramite(nuevoTramite).subscribe((addTramiteResponse: any) => {
                    const tramiteId = addTramiteResponse.additional.id;
                    expect(addTramiteResponse.code).toBe(expectedCode);
                    expect(typeof tramiteId).toEqual('number');
                    expect(tramiteId).toBeGreaterThan(0);

                    const tramiteEditar = testHelper.createTramiteEditar(areaId, tramiteId);
                    agregarTramiteService.editarTramite(tramiteEditar).subscribe((editResponse: any) => {
                        expect(editResponse.code).toBe(expectedCode);

                        eliminarTramiteService.eliminarTramite(tramiteId).subscribe((deleteTramiteResponse: any) => {
                            expect(deleteTramiteResponse.code).toBe(expectedCode);

                            testHelper.eliminarArea(organismoId, areaId).subscribe((deleteAreaResponse: any) => {
                                testHelper.eliminarOrganismo(organismoId).subscribe((deleteOrganismoResponse: any) => {
                                    done();
                                }, ((err: Error) => {
                                    done.fail(err);
                                }));
                            }, ((err: Error) => {
                                done.fail(err);
                            }));
                        }, ((err: Error) => {
                            done.fail(err);
                        }));
                    }, ((err: Error) => {
                        done.fail(err);
                    }));
                }, ((err: Error) => {
                    done.fail(err);
                }));
            }, ((err: Error) => {
                done.fail(err);
            }));
        }, ((err: Error) => {
            done.fail(err);
        }));
    });

    it('should get camposDisponibles list', (done: DoneFn) => {
        const agregarTramiteService: AgregarTramiteService = TestBed.get(AgregarTramiteService);

        agregarTramiteService.getCamposDisponibles().subscribe((resultado: any) => {
            expect(resultado).not.toBe(null);
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
