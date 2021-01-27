import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';





describe('AuthService', () => {
    //   let injector: TestBed;
    //   let httpMock: HttpTestingController;
    var service: AuthService;
    var afAuth: AngularFireAuth;
    var userID: string | null | undefined = null;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                AngularFireModule.initializeApp(environment.firebaseConfig)
            ],
            providers: [AuthService]
        });
        service = TestBed.inject(AuthService);
        afAuth = TestBed.inject(AngularFireAuth);

        afAuth.signInWithEmailAndPassword('testaccount@gmail.com', 'password');
        console.log(
            service.getSyncUID().then(uid => console.log(uid + ' line 51')));

        userID = await service.getSyncUID();
        console.log(userID);
    });

    
    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('should test getSyncUID', () => {
        console.log(userID);
        expect(userID).toEqual("vW1kTjIuxYhGyBN7VCk4VnCnCPp1");
    });


    it('should test getSyncEmail', async () => {
        let email = await service.getSyncEmail();
        console.log(email);
        expect(email).toEqual("testaccount@gmail.com");
    });

    it('should test getSyncDisplayName', async () => {
        let displayName = await service.getSyncDisplayName();
        console.log(displayName);
        expect(displayName).toEqual("Test User");
    });

    it('should test getSyncToken', async () => {
        let token = await service.getSyncToken();
        console.log(token);
        expect(token).toBeDefined();
    });


    it('should test getSyncMetaData', async () => {
        let metaData = await service.getSyncMetaData();
        console.log(metaData);
        expect(metaData).toBeDefined();
    });


});





