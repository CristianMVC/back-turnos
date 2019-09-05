import { TestBed, inject } from '@angular/core/testing';
import { AgregarOrganismoService } from './agregar-organismo.service';
import { TestHelper } from './models/test-utilities';
import { EliminarOrganismoService } from '../../eliminar-organismo/services/eliminar-organismo.service';
import { TestingModule, LoginService } from '../../../../testing.module';

describe('AgregarOrganismoService', () => {

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [AgregarOrganismoService, EliminarOrganismoService],
            imports: [TestingModule]
        });
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([AgregarOrganismoService], (service: AgregarOrganismoService) => {
        expect(service).toBeTruthy();
    }));

    it('should crear organismo', (done: DoneFn) => {
        const service: AgregarOrganismoService = TestBed.get(AgregarOrganismoService);
        const nuevoOrganismo = TestHelper.createNuevoOrganismo();
        return service.agregarOrganismo(nuevoOrganismo).subscribe((response: any) => {
            const expectedCode = 200;
            expect(response.code).toBe(expectedCode);
            expect(response.additional).not.toBeNull();
            expect(response.additional.id).not.toBeNull();
            done();
        }, ((err: Error) => {
            done.fail(err);
        }));
    });

    it('should add / edit / remove organismo', (done: DoneFn) => {
        const eliminarService: EliminarOrganismoService = TestBed.get(EliminarOrganismoService);
        const agregarService: AgregarOrganismoService = TestBed.get(AgregarOrganismoService);

        const nuevoOrganismo = TestHelper.createNuevoOrganismo();
        return agregarService.agregarOrganismo(nuevoOrganismo).subscribe((addResponse: any) => {
            const newId = addResponse.additional.id;
            const expectedCode = 200;
            expect(addResponse.code).toBe(expectedCode);
            expect(typeof newId).toEqual('number');
            expect(newId).toBeGreaterThan(0);

            const organismoAEditar = TestHelper.createOrganismoAEditar(newId);
            agregarService.editarOrganismo(organismoAEditar).subscribe((editResponse: any) => {
                expect(editResponse.code).toBe(expectedCode);

                eliminarService.eliminarOrganismo(newId).subscribe((deleteResponse: any) => {
                    expect(deleteResponse.code).toBe(expectedCode);
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
    });

    afterEach((done: DoneFn) => {
        const service: LoginService = TestBed.get(LoginService);
        return service.logout().subscribe(done);
    })

});
