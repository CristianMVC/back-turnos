import { TestBed, inject } from '@angular/core/testing';
import { TestingModule } from '../../testing.module';
import { ProvinciaLocalidadService } from './provincia-localidad.service';

describe('PuntoAtencionService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ProvinciaLocalidadService],
            imports: [TestingModule]
        });
    });

    it('should be created', inject([ProvinciaLocalidadService], (service: ProvinciaLocalidadService) => {
        expect(service).toBeTruthy();
    }));

    it('should get all provincias', (done: DoneFn) => {
        const service: ProvinciaLocalidadService = TestBed.get(ProvinciaLocalidadService);
        service.getProvincias().subscribe((result: any) => {
            expect(result.size).toBeGreaterThan(0);
            expect(result.provincias[0].id).not.toBeNull();
            expect(result.provincias[0].nombre).not.toBeNull();
            done();
        }, ((err: Error) => {
            done.fail(err);
        }));
    });

    it('should get all localidades by provincia', (done: DoneFn) => {
        const service: ProvinciaLocalidadService = TestBed.get(ProvinciaLocalidadService);
        service.getProvincias().subscribe((provincias: any) => {
            const prov: Provincia =  provincias.provincias[0];
            expect(prov.id).toBeGreaterThan(0);
            const keywords = 'aca';
            service.getLocalidades(keywords, prov.id).subscribe((result: any) => {
                expect(result.localidades[0].id).not.toBeNull();
                expect(result.localidades[0].nombre).not.toBeNull();
                done();
            }, ((err: Error) => {
                done.fail(err);
            }));
        });
    });
});
