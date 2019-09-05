import { TestBed, inject } from '@angular/core/testing';
import { AgregarOrganismoService, EliminarOrganismoService, AbmOrganismoModule } from '../../../../organismos/abm/abm-organismo.module';
import { AgregarAreaService } from './agregar-area.service';
import { EliminarAreaService } from '../../eliminar-area/services/eliminar-area.service';
import { TestHelper } from './models/test-utilities';
import { TestingModule, LoginService } from '../../../../testing.module';

describe('AgregarAreaService', () => {

    let originalTimeout: number;

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [AgregarAreaService, EliminarAreaService, AgregarOrganismoService, EliminarOrganismoService, LoginService],
            imports: [TestingModule, AbmOrganismoModule]
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000; // tslint:disable-line:no-magic-numbers
        const service: LoginService = TestBed.get(LoginService);
        service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([AgregarAreaService], (service: AgregarAreaService) => {
        expect(service).toBeTruthy();
    }));

    it('should add / edit / remove area', (done: DoneFn) => {
        const agregarOrganismoService: AgregarOrganismoService = TestBed.get(AgregarOrganismoService);
        const eliminarOrganismoService: EliminarOrganismoService = TestBed.get(EliminarOrganismoService);

        const nuevoOrganismo = TestHelper.createNuevoOrganismo();
        return agregarOrganismoService.agregarOrganismo(nuevoOrganismo).subscribe((addOrganismoResponse: any) => {
            const organismoId = addOrganismoResponse.additional.id;
            const expectedCode = 200;
            expect(addOrganismoResponse.code).toBe(expectedCode);
            expect(typeof organismoId).toEqual('number');
            expect(organismoId).toBeGreaterThan(0);

            const agregarAreaService: AgregarAreaService = TestBed.get(AgregarAreaService);
            const eliminarAreaService: EliminarAreaService = TestBed.get(EliminarAreaService);

            const nuevoArea = TestHelper.createNuevoArea();
            return agregarAreaService.agregarArea(organismoId, nuevoArea).subscribe((addAreaResponse: any) => {
                const newId = addAreaResponse.additional.id;
                expect(addAreaResponse.code).toBe(expectedCode);
                expect(typeof newId).toEqual('number');
                expect(newId).toBeGreaterThan(0);

                const AreaAEditar = TestHelper.createAreaAEditar(newId);
                agregarAreaService.editarArea(organismoId, AreaAEditar).subscribe((editResponse: BackOfficeStatusResponse) => {
                    expect(editResponse.code).toBe(expectedCode);

                    eliminarAreaService.eliminarArea(organismoId, newId).subscribe((deleteAreaResponse: any) => {
                        expect(deleteAreaResponse.code).toBe(expectedCode);

                        eliminarOrganismoService.eliminarOrganismo(organismoId).subscribe((deleteOrganismoResponse: any) => {
                            expect(deleteOrganismoResponse.code).toBe(expectedCode);
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
    });

    afterEach((done: DoneFn) => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      const service: LoginService = TestBed.get(LoginService);
      service.logout().subscribe(done);
    });
});
