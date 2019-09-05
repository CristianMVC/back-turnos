import { TestBed, inject } from '@angular/core/testing';
import { CategoriasService } from './categorias.service';
import { TestingModule, LoginService } from '../../../testing.module';

describe('CategoriasService', () => {

    beforeEach((done: DoneFn) => {
        TestBed.configureTestingModule({
            providers: [CategoriasService],
            imports: [TestingModule]
        });
        const service: LoginService = TestBed.get(LoginService);
        return service.login('test@test.com', 'test1234').subscribe(done);
    });

    it('should be created', inject([CategoriasService], (service: CategoriasService) => {
        expect(service).toBeTruthy();
    }));

    it('should get Categorias list', (done: DoneFn) => {
        const service: CategoriasService = TestBed.get(CategoriasService);
        const puntoAtencionId = 1;

        service.getCategorias(puntoAtencionId).subscribe((resultado: CategoriasPaginables) => {
            expect(resultado.categorias.length).toBeGreaterThanOrEqual(0);
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




