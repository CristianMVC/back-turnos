import { TestBed, inject } from '@angular/core/testing';
import { EliminarOrganismoService } from './eliminar-organismo.service';
import { AgregarOrganismoService } from '../../agregar-organismo/services/agregar-organismo.service';
import { TestHelper } from '../../agregar-organismo/services/models/test-utilities';
import { TestingModule, LoginService } from '../../../../testing.module';

describe('EliminarOrganismoService', () => {

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [EliminarOrganismoService, AgregarOrganismoService],
            imports: [TestingModule]
        });
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([EliminarOrganismoService, AgregarOrganismoService],
        (eliminarService: EliminarOrganismoService, agregarService: AgregarOrganismoService) => {
        expect(eliminarService).toBeTruthy();
        expect(agregarService).toBeTruthy();
    }));

    it('should add / remove organismo', (done: DoneFn) => {
        const eliminarService: EliminarOrganismoService = TestBed.get(EliminarOrganismoService);
        const agregarService: AgregarOrganismoService = TestBed.get(AgregarOrganismoService);

        const nuevoOrganismo = TestHelper.createNuevoOrganismo();
        return agregarService.agregarOrganismo(nuevoOrganismo).subscribe((addResponse: any) => {
            const newId = addResponse.additional.id;
            const expectedCode = 200;
            expect(addResponse.code).toBe(expectedCode);
            expect(typeof newId).toEqual('number');
            expect(newId).toBeGreaterThan(0);

            eliminarService.eliminarOrganismo(newId).subscribe((response: any) => {
                expect(response.code).toBe(expectedCode);
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
