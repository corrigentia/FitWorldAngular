import { AuthService } from './../../shared/auth/services/auth.service';
import { UserRegistration } from './../../shared/auth/interfaces/user-registration';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { STUDENTS } from 'src/app/db/cached-students';
// import { StudentIdEmail } from '../../interfaces/student-id-email'
// import { StudentIdEmailPassword } from '../../interfaces/student-id-email-password'
import { StudentSpring as StudentSpringClass } from '../../models/student-spring';
import { Logger } from '../../shared/services/logger.service';
// import { STUDENTS } from '../db/mock-students';
// import { Student } from '../interfaces/student';
// import { StudentWithPassword } from '../interfaces/student-with-password';
import { IStudentSpring } from 'src/app/interfaces/student-spring';
import { MessageService } from '../../shared/services/message.service';
import { EntityCrudService } from 'src/app/shared/services/entity-crud.service';
import { IEntityRegisteredService } from 'src/app/shared/services/i-entity-registered';
import { environment } from '../../../environments/environment';
import { UserTokenDTO } from '../../shared/session/interfaces/user-token-d-t-o';
import { SessionService } from '../../shared/session/services/session.service';
import { NavigationService } from '../../shared/services/navigation.service';
// import { Student } from 'src/app/interfaces/student';

type MainType = IStudentSpring;
// type MainType = UserRegistration;

class ModelClassConstructor extends StudentSpringClass {
  constructor(
    username: string,
    password: string,
    firstName: string,
    lastName: string | null
  ) {
    super(username, password, firstName, lastName);
  }
}

@Injectable({
  providedIn: 'root',
})
export class StudentService
  extends EntityCrudService<
    // Omit<EntityCrudService['TypeInterface'],K extends { name: string; price: number }>
    MainType,
    ModelClassConstructor
  >
  implements IEntityRegisteredService
{
  // TODO: STUDENTS
  // students = of(STUDENTS);

  constructor(
    private readonly authService: AuthService,
    private readonly _session: SessionService,
    private readonly _navigation: NavigationService
  ) {
    super('student', STUDENTS);
  }

  // 30/01/2023
  // TODO: check for spaces before and after entered string
  // isEmailRegistered (givenEmail: string): Observable<boolean> {
  isEntityRegistered(givenUsername: string): Observable<boolean> {
    // givenEmail = givenEmail.trim()
    givenUsername = givenUsername.trim();

    return this.getStudents(0, 9999).pipe(
      map((students) => {
        const isRegistered: boolean =
          students.filter(
            // student => student.email.toUpperCase() === givenEmail.toUpperCase()
            (student) =>
              student.email.toUpperCase() === givenUsername.toUpperCase()
          ).length > 0;

        return isRegistered;
      })
    );
  }

  /**
   * GET `Student`s from the server
   *
   * @returns an `Observable` array `[]` of `Student`s
   */
  // getAll(): Student[] {
  // getAll (): Observable<StudentIdEmail[]> {
  getStudents(pageOffset = 0, entriesPerPage = 5): Observable<MainType[]> {
    // const students = of(STUDENTS);
    // return STUDENTS;

    // this.messageService.add('StudentService: fetched students');

    // return students;
    // return this.http.get<Student[]>(this.studentsUrl);
    // return (
    // .get(this.studentsUrl)
    // .get<StudentIdEmail[]>(this.studentsUrl)
    // .get<IStudentSpring[]>(this.studentsUrl)
    // .get<IStudentSpring[]>(url)
    // .pipe(catchError(this.handleError('getStudents')))
    // .pipe(catchError(this.handleError<Student[]>('getStudents')))

    // tap((_) =>
    return super.getAll(
      (student) =>
        new ModelClassConstructor(
          student.email,
          student.password,
          student.firstName,
          student.lastName
        ),

      /*
      (allCollection: MainType[]) =>
        this.CACHED_COLLECTION.push(
          // ...students.map(student => new EmailClass(student.email))
          ...allCollection.map(
            (student) =>
              new ModelClassConstructor(
                student.firstName,
                student.lastName,
                student.username,
                student.password
              )
          )
        ),
        */

      pageOffset,
      entriesPerPage
    );

    // catchError(this.handleError<StudentIdEmail[]>('getStudents', []))

    // );

    // return of<StudentIdEmail[]>(this.students); // never returns the filled array // always returns the empty array
  }

  /**
   * GET `Student` by `id`. Will 404 if `id` not found
   *
   * @param id - the number of the `Student` to retrieve
   * @returns `Student` with the given `id`
   */
  // getStudent (id: number): Observable<StudentIdEmail> {

  /**
   * GET `Student` by `email`. Will 404 if `email` not found
   *
   * @param email - the number of the `Student` to retrieve
   * @returns `Student` with the given `email`
   */
  // getStudentByEmail (email: string): Observable<StudentIdEmail> {
  getStudentByEmail(email: string): Observable<MainType> {
    // const student = STUDENTS.find((student) => student.id === id)!;
    const url = `${this.collectionUrlSpring}/email/${email}`;

    // this.messageService.add(`StudentService: fetched student id=${id}`);

    // return of(student);
    // return this.http.get<Student>(url);
    // return this.http.get<StudentIdEmail>(url).pipe(
    return this.http.get<MainType>(url).pipe(
      // tap((_) => {
      tap((student) => {
        this.logger.log(`Fetched student ${JSON.stringify(student)}`);
        this.log(`fetched student email=${email}`);
      }),
      // catchError(this.handleError<StudentIdEmail>(`getStudent email=${email}`))
      catchError(this.handleError<MainType>(`getStudent email=${email}`))
    );
  }

  /**
   * `DELETE`: `delete` the `StudentIdEmail` from the server
   *
   * @param studentId - the `studentId` of the `StudentIdEmail` to delete
   * @returns an `Observable`
   */
  // deleteStudent (studentId: number): Observable<StudentIdEmail> {
  deleteStudent(studentId: number): Observable<MainType> {
    const url = `${this.collectionUrlSpring}/${studentId}`;

    // return this.http.delete<StudentIdEmail>(url, this.httpOptions).pipe(
    return this.http.delete<MainType>(url, this.httpOptions).pipe(
      // tap((_) => {
      tap((student) => {
        this.logger.log(
          `Deleted student id=${studentId} ${JSON.stringify(student)}`
        );
        this.log(`deleted student id=${studentId}`);
      }),
      // catchError(this.handleError<StudentIdEmail>('deleteStudent'))
      catchError(this.handleError<MainType>('deleteStudent'))
    );
  }

  /**
   * PUT: update the `Student` on the server
   *
   * @param student - the changed `Student` on the server
   * @returns an `Observable` of the changed `Student` on the server
   */
  // updateStudent(student: StudentWithPassword): Observable<any> {
  // updateStudent (student: StudentIdEmailPassword): Observable<any> {
  updateStudent(student: MainType): Observable<any> {
    // TODO: look into why I had to change [FromForm] to [FromBody] in the C# API PUT update method

    const url = `${this.collectionUrlSpring}/${student.id}`;

    // const body = student;
    // const body = { Email: student.email, Password: student.password };
    // const body = { email: student.email, password: student.password };
    // const body: EmailPassword = { ...student };
    // WORKS above
    // TODO: check whether the below works, mimicking official Angular way
    // const body = { ...student } as EmailPassword
    // const body = { ...student } as MainType;
    const body = {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      password: student.password,
    };

    this.log('student update form : ');
    this.log(JSON.stringify(body));

    // this.log(body.studentId.toString());
    // this.log(body.email);
    // this.log(body.Email);
    // this.log(body.password);
    // this.log(body.Password);

    // return this.http.put(this.studentsUrl, student, this.httpOptions).pipe(
    // return this.http.put(url, student, this.httpOptions).pipe(
    return this.http.put(url, body, this.httpOptions).pipe(
      // tap((_) => {
      tap((object) => {
        console.log('just inside put request');
        this.logger.log(
          `Updated student ${JSON.stringify(student)} id=${
            student.id
          } ${JSON.stringify(object)}`
        );
        this.log(`updated student id=${student.id}`);
      }),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  /**
   * `POST`: `add` a new `StudentIdEmail` to the server
   *
   * @param student - the new `StudentIdEmail` to create on the server
   * @returns the `Observable<StudentIdEmail>` to the caller
   */
  // addStudent (/*arg0*/ student: EmailPassword): Observable<StudentIdEmail> {
  addStudent(/*arg0*/ student: UserRegistration): Observable<MainType> {
    // const url = 'api/auth/register';
    const url = `http://localhost:8080/register`;

    // return this.http.post<StudentIdEmail>(url, student, this.httpOptions).pipe(
    return this.http.post<MainType>(url, student, this.httpOptions).pipe(
      // tap((newStudent: StudentIdEmail) => {
      tap((newStudent: MainType) => {
        this.logger.log(
          `Added student ${JSON.stringify(newStudent)} w/ id=${newStudent.id}`
        );
        this.log(`added student w/ id=${newStudent.id}`);
      }),
      // catchError(this.handleError<StudentIdEmail>('addStudent'))
      catchError(this.handleError<MainType>('addStudent'))
    );
  }

  // searchStudents (term: string): Observable<StudentIdEmail[]> {
  searchStudents(term: string): Observable<MainType[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `StudentIdEmail[]` array
      return of([]);
    }

    // 20/01/2023
    // TODO: come back to this !!!

    return (
      this.http
        // 20/01/2023
        // TODO: change route url path to access c# api
        // .get<StudentIdEmail[]>(`${this.studentsUrl}?email=${term}`)
        .get<MainType[]>(`${this.collectionUrlSpring}?email=${term}`)
        .pipe(
          tap((resultList) =>
            resultList.length
              ? this.log(`found students matching '${term}'`)
              : this.log(`no students matching '${term}'`)
          ),
          // 20/01/2023
          // TODO: second argument of handleError should be an empty [] array
          // catchError(this.handleError<StudentIdEmail[]>('searchStudent', []))
          catchError(this.handleError<MainType[]>('searchStudent', []))
        )
    );
  }
}
