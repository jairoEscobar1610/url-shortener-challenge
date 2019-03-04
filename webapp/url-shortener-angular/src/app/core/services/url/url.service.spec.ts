import { async, ComponentFixture, TestBed, getTestBed, fakeAsync, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlService } from './url.service';
import { HttpClientModule } from '@angular/common/http';
import { MockupGeneratedUrls } from '../../mockups/generated-url.mockup';
import { Url } from '../../../shared/models/url.model';
import { LoggerService } from '../logger.service';
import { ConsoleLoggerService } from '../console-logger.service';

describe('UrlService', () => {
  let injector: TestBed;
  let service: UrlService;
  let httpMock: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [UrlService,{ provide: LoggerService, useClass: ConsoleLoggerService }]
    })
      .compileComponents();
    injector = getTestBed();
    service = injector.get(UrlService);
    httpMock = injector.get(HttpTestingController);
  }));

  it('should be created', () => {
    const service: UrlService = TestBed.get(UrlService);
    expect(service).toBeTruthy();
  });
  it('should not return an url (empty hash)',
    inject(
      [UrlService, HttpTestingController],
      (urlService: UrlService, backend: HttpTestingController) => {

        urlService.getUrl(undefined).subscribe((data: any) => {
          expect(data.url).not.toBe('http://site.com');
        });

        const url = `${urlService.apiUrl}/`;
        const responseObject = {
          error:"Hash is required"
        };
        const requestWrapper = backend.expectOne(`${urlService.apiUrl}/undefined`);
        requestWrapper.flush(responseObject);
        expect(requestWrapper.request.method).toEqual('GET');

        httpMock.verify();
      }
    )
  );

  it('should return an url (with hash)',
    inject(
      [UrlService, HttpTestingController],
      (urlService: UrlService, backend: HttpTestingController) => {

        urlService.getUrl("ABCDEFG").subscribe((data: any) => {
          expect(data.url).toBe('http://site.com');
        });

        // Set up
        const url = `${urlService.apiUrl}/`;
        const responseObject = {
          url: "http://site.com",
          hash: "ABCDEFG",
          isCustom: true,
          removeToken: "ABCDEFG",
          createdAt: new Date(),
          active: true,
        };
        // End Setup

        const requestWrapper = backend.expectOne(`${urlService.apiUrl}/ABCDEFG`);
        requestWrapper.flush(responseObject);
        expect(requestWrapper.request.method).toEqual('GET');

        httpMock.verify();
      }
    )
  );
  it('should not return any urls (invalid params)',
    inject(
      [UrlService, HttpTestingController],
      (urlService: UrlService, backend: HttpTestingController) => {

         urlService.getUrlList(10,-10,"createdAt","desc").subscribe((data: any) => {
          expect(data.list).toBe(undefined);
        });

        // Set up
        const url = `${urlService.apiUrl}/`;
        const responseObject = {
          error:"Invalid params"
        };
        const requestWrapper = backend.expectOne(`${urlService.apiUrl}/list/10/-10/createdAt/desc`);
        requestWrapper.flush(responseObject);
        expect(requestWrapper.request.method).toEqual('GET');

        httpMock.verify();
      }
    )
  );
  it('should not return any urls (missing params)',
    inject(
      [UrlService, HttpTestingController],
      (urlService: UrlService, backend: HttpTestingController) => {

         urlService.getUrlList(10,-10,"createdAt","desc").subscribe((data: any) => {
          expect(data.list).toBe(undefined);
        });

        // Set up
        const url = `${urlService.apiUrl}/`;
        const responseObject = {
          error:"Missing params"
        };
        const requestWrapper = backend.expectNone(`${urlService.apiUrl}/list/undefined`);

      }
    )
  );

  it('should return an url list',
    inject(
      [UrlService, HttpTestingController],
      (urlService: UrlService, backend: HttpTestingController) => {

        urlService.getUrlList(10,1,"createdAt","desc").subscribe((data: any) => {
          expect(data.list[0].url).toBe('http://site.com');
        });

        // Set up
        const url = `${urlService.apiUrl}/`;
        const responseObject = {
          list:[{
          url: "http://site.com",
          hash: "ABCDEFG",
          isCustom: true,
          removeToken: "ABCDEFG",
          createdAt: new Date(),
          active: true,
        }], pages:1};
        // End Setup

        const requestWrapper = backend.expectOne(`${urlService.apiUrl}/list/10/1/createdAt/desc`);
        requestWrapper.flush(responseObject);
        expect(requestWrapper.request.method).toEqual('GET');

        httpMock.verify();
      }
    )
  );
  it('should return a newly generated url',
    inject(
      [UrlService, HttpTestingController],
      (urlService: UrlService, backend: HttpTestingController) => {

        urlService.generateUrl("ABCDEFG").subscribe((data: any) => {
          expect(data.url).toBe('http://site.com');
        });

        // Set up
        const responseObject = {
          url: "http://site.com",
          hash: "ABCDEFG",
          isCustom: true,
          removeToken: "ABCDEFG",
          createdAt: new Date(),
          active: true,
        };
        // End Setup

        const requestWrapper = backend.expectOne(`${urlService.apiUrl}`);
        requestWrapper.flush(responseObject);
        expect(requestWrapper.request.method).toEqual('POST');

        httpMock.verify();
      }
    )
  );
  it('should return a newly custom generated url',
    inject(
      [UrlService, HttpTestingController],
      (urlService: UrlService, backend: HttpTestingController) => {

        urlService.postCustomUrl("http://site.com","ABCDEFG").subscribe((data: any) => {
          expect(data.hash).toBe('ABCDEFG');
        });

        // Set up
        const responseObject = {
          url: "http://site.com",
          hash: "ABCDEFG",
          isCustom: true,
          removeToken: "ABCDEFG",
          createdAt: new Date(),
          active: true,
        };
        // End Setup

        const requestWrapper = backend.expectOne(`${urlService.apiUrl}/custom`);
        requestWrapper.flush(responseObject);
        expect(requestWrapper.request.method).toEqual('POST');
      }
    )
  );
  it('should delete an url',
  inject(
    [UrlService, HttpTestingController],
    (urlService: UrlService, backend: HttpTestingController) => {

      urlService.deleteUrl(`${urlService.apiUrl}/ABCDEFG/remove/BBAABCDEFG`).subscribe((data: any) => {
        expect(data.status).toBe(200);
      });

      // Set up
      const responseObject = {
        status:200
      };
      // End Setup

      const requestWrapper = backend.expectOne(`${urlService.apiUrl}/ABCDEFG/remove/BBAABCDEFG`);
      requestWrapper.flush(responseObject);
      expect(requestWrapper.request.method).toEqual('DELETE');

      httpMock.verify();
    }
  )
);
});