import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { STUDENTS } from 'src/app/db/cached-students'
import { EmailPassword } from '../../interfaces/email-password'
import { Email as EmailClass } from '../../models/email'
import { StudentIdEmail } from '../../interfaces/student-id-email'
import { StudentIdEmailPassword } from '../../interfaces/student-id-email-password'
import { Logger } from './logger.service'
// import { STUDENTS } from '../db/mock-students';
// import { Student } from '../interfaces/student';
// import { StudentWithPassword } from '../interfaces/student-with-password';
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly students: StudentIdEmail[] = []

  /**
   * :base/:collectionName - URL to web api
   */
  private studentsUrl = 'api/students' // URL to web api

  // TODO: STUDENTS
  // students = of(STUDENTS);

  constructor (
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) {}

  /**
   * Log a `StudentService` message with the `MessageService`
   * @param message - the `StudentService` message to log
   */
  private log (message: string) {
    this.messageService.add(`StudentService: ${message}`)
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional `T` value to return as the `Observable` result
   * @returns an empty `T` result to let the app keep running
   */
  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead
      this.logger.error(error)

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      // return of(result);
      return of(result as T)
    }
  }

  // 30/01/2023
  // TODO: check for spaces before and after entered string
  isEmailRegistered (givenEmail: string): Observable<boolean> {
    givenEmail = givenEmail.trim()

    return this.getStudents().pipe(
      map(students => {
        const isRegistered: boolean =
          students.filter(
            student => student.email.toUpperCase() === givenEmail.toUpperCase()
          ).length > 0

        return isRegistered
      })
    )
  }

  /**
   * GET `Student`s from the server
   *
   * @returns an `Observable` array `[]` of `Student`s
   */
  // getStudents(): Student[] {
  getStudents (): Observable<StudentIdEmail[]> {
    // const students = of(STUDENTS);
    // return STUDENTS;

    // this.messageService.add('StudentService: fetched students');

    // return students;
    // return this.http.get<Student[]>(this.studentsUrl);
    // return (
    return (
      this.http
        // .get(this.studentsUrl)
        .get<StudentIdEmail[]>(this.studentsUrl)
        // .pipe(catchError(this.handleError('getStudents')))
        // .pipe(catchError(this.handleError<Student[]>('getStudents')))
        .pipe(
          // tap((_) =>
          tap(students => {
            this.logger.log(`Fetched ${students.length} students`)
            this.log('fetched students')

            this.students.splice(0)
            this.students.push(...students) // fill cache

            STUDENTS.splice(0)
            STUDENTS.push(
              ...students.map(student => new EmailClass(student.email))
            ) // fill cache
            this.logger.warn('STUDENTS')
            this.logger.warn(STUDENTS)

            this.logger.warn('students')
            this.logger.warn(this.students)
          }),
          catchError(this.handleError<StudentIdEmail[]>('getStudents', []))
        )
    )
    // );

    // return of<StudentIdEmail[]>(this.students); // never returns the filled array // always returns the empty array
  }

  /**
   * GET `Student` by `id`. Will 404 if `id` not found
   *
   * @param id - the number of the `Student` to retrieve
   * @returns `Student` with the given `id`
   */
  getStudent (id: number): Observable<StudentIdEmail> {
    // const student = STUDENTS.find((student) => student.id === id)!;
    const url = `${this.studentsUrl}/${id}`

    // this.messageService.add(`StudentService: fetched student id=${id}`);

    // return of(student);
    // return this.http.get<Student>(url);
    return this.http.get<StudentIdEmail>(url).pipe(
      // tap((_) => {
      tap(student => {
        this.logger.log(`Fetched student ${JSON.stringify(student)}`)
        this.log(`fetched student id=${id}`)
      }),
      catchError(this.handleError<StudentIdEmail>(`getStudent id=${id}`))
    )
  }

  /**
   * GET `Student` by `email`. Will 404 if `email` not found
   *
   * @param email - the number of the `Student` to retrieve
   * @returns `Student` with the given `email`
   */
  getStudentByEmail (email: string): Observable<StudentIdEmail> {
    // const student = STUDENTS.find((student) => student.id === id)!;
    const url = `${this.studentsUrl}/email/${email}`

    // this.messageService.add(`StudentService: fetched student id=${id}`);

    // return of(student);
    // return this.http.get<Student>(url);
    return this.http.get<StudentIdEmail>(url).pipe(
      // tap((_) => {
      tap(student => {
        this.logger.log(`Fetched student ${JSON.stringify(student)}`)
        this.log(`fetched student email=${email}`)
      }),
      catchError(this.handleError<StudentIdEmail>(`getStudent email=${email}`))
    )
  }

  httpOptions = {
    headers: new HttpHeaders({
      // TODO: maybe come back to this as well
      'Content-Type': 'application/json'
    })
  }

  /**
   * `DELETE`: `delete` the `StudentIdEmail` from the server
   *
   * @param studentId - the `studentId` of the `StudentIdEmail` to delete
   * @returns an `Observable`
   */
  deleteStudent (studentId: number): Observable<StudentIdEmail> {
    const url = `${this.studentsUrl}/${studentId}`

    return this.http.delete<StudentIdEmail>(url, this.httpOptions).pipe(
      // tap((_) => {
      tap(student => {
        this.logger.log(
          `Deleted student id=${studentId} ${JSON.stringify(student)}`
        )
        this.log(`deleted student id=${studentId}`)
      }),
      catchError(this.handleError<StudentIdEmail>('deleteStudent'))
    )
  }

  /**
   * PUT: update the `Student` on the server
   *
   * @param student - the changed `Student` on the server
   * @returns an `Observable` of the changed `Student` on the server
   */
  // updateStudent(student: StudentWithPassword): Observable<any> {
  updateStudent (student: StudentIdEmailPassword): Observable<any> {
    // TODO: look into why I had to change [FromForm] to [FromBody] in the C# API PUT update method

    const url = `${this.studentsUrl}/${student.id}`

    // const body = student;
    // const body = { Email: student.email, Password: student.password };
    // const body = { email: student.email, password: student.password };
    // const body: EmailPassword = { ...student };
    // WORKS above
    // TODO: check whether the below works, mimicking official Angular way
    const body = { ...student } as EmailPassword

    this.log(JSON.stringify(body))

    // this.log(body.studentId.toString());
    // this.log(body.email);
    // this.log(body.Email);
    // this.log(body.password);
    // this.log(body.Password);

    // return this.http.put(this.studentsUrl, student, this.httpOptions).pipe(
    // return this.http.put(url, student, this.httpOptions).pipe(
    return this.http.put(url, body, this.httpOptions).pipe(
      // tap((_) => {
      tap(object => {
        this.logger.log(
          `Updated student ${JSON.stringify(student)} id=${
            student.id
          } ${JSON.stringify(object)}`
        )
        this.log(`updated student id=${student.id}`)
      }),
      catchError(this.handleError<any>('updateStudent'))
    )
  }

  /**
   * `POST`: `add` a new `StudentIdEmail` to the server
   *
   * @param student - the new `StudentIdEmail` to create on the server
   * @returns the `Observable<StudentIdEmail>` to the caller
   */
  addStudent (/*arg0*/ student: EmailPassword): Observable<StudentIdEmail> {
    const url = 'api/auth/register'

    return this.http.post<StudentIdEmail>(url, student, this.httpOptions).pipe(
      tap((newStudent: StudentIdEmail) => {
        this.logger.log(
          `Added student ${JSON.stringify(newStudent)} w/ id=${newStudent.id}`
        )
        this.log(`added student w/ id=${newStudent.id}`)
      }),
      catchError(this.handleError<StudentIdEmail>('addStudent'))
    )
  }

  searchStudents (term: string): Observable<StudentIdEmail[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `StudentIdEmail[]` array
      return of([])
    }

    // 20/01/2023
    // TODO: come back to this !!!

    return (
      this.http
        // 20/01/2023
        // TODO: change route url path to access c# api
        // .get<StudentIdEmail[]>(`${this.studentsUrl}/?email=${term}`)
        .get<StudentIdEmail[]>(`${this.studentsUrl}/emails/${term}`)
        .pipe(
          tap(resultList =>
            resultList.length
              ? this.log(`found students matching '${term}'`)
              : this.log(`no students matching '${term}'`)
          ),
          // 20/01/2023
          // TODO: second argument of handleError should be an empty [] array
          catchError(this.handleError<StudentIdEmail[]>('searchStudent', []))
        )
    )
  }
}
