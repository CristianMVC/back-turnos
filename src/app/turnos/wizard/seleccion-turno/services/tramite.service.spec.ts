import { TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { TramiteService } from './tramite.service';

describe('TramiteService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TramiteService],
            imports: [HttpModule]
        });
    });

    it('should get tramite by id', (done: DoneFn) => {
        const service: TramiteService = TestBed.get(TramiteService);
        const tramiteId = 26;
        service.getTramiteById(tramiteId).subscribe((tramite: TurnosTramite) => {
            expect(tramite).toBeDefined();
            done();
        }, ((err: Error) => {
            done.fail(err);
        }));
    });

});
