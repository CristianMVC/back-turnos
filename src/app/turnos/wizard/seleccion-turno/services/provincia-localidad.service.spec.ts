import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { ProvinciaLocalidadService } from './provincia-localidad.service';

describe('PuntoAtencionService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ProvinciaLocalidadService],
            imports: [HttpModule]
        });
    });

    it('should be created', inject([ProvinciaLocalidadService], (service: ProvinciaLocalidadService) => {
        expect(service).toBeTruthy();
    }));

    it('should get all provincias', (done: DoneFn) => {
        const tramiteId = 26;
        const service: ProvinciaLocalidadService = TestBed.get(ProvinciaLocalidadService);
        service.getProvincias(tramiteId).subscribe((provincias: Provincia[]) => {
            expect(provincias.length).toBeGreaterThan(0);
            expect(provincias[0].id).not.toBeNull();
            expect(provincias[0].nombre).not.toBeNull();
            done();
        }, ((err: Error) => {
            done.fail(err);
        }));
    });

    it('should get all localidades by provincia', (done: DoneFn) => {
        const tramiteId = 26;
        const service: ProvinciaLocalidadService = TestBed.get(ProvinciaLocalidadService);
        service.getProvincias(tramiteId).subscribe((provincias: Provincia[]) => {
            service.getLocalidades(provincias[0].id, tramiteId).subscribe((localidades: Localidad[]) => {
                expect(localidades.length).toBeGreaterThan(0);
                expect(localidades[0].id).not.toBeNull();
                expect(localidades[0].nombre).not.toBeNull();
                done();
            }, ((err: Error) => {
                done.fail(err);
            }));
        });
    });
});
