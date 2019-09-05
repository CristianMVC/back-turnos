type Rol = 'ROL_ADMIN' | 'ROL_ORGANISMO' | 'ROL_AREA' | 'ROL_PUNTOATENCION' | 'ROL_AGENTE' | 'ROL_ORGANISMO_AUX'

interface PaginationContext {
  currentPage: number,
  totalPages: number,
  pages: number[],
  isValidPageNumber: (x: number) => boolean,
  isTheFirstOne: () => boolean,
  isTheLastOne: () => boolean,
  isTheCurrentPage: (x: number) => boolean,
  hasResults: () => boolean
}

interface ResetResponse {
  validToken: boolean,
  username?: string
}

interface Provincia {
  id: number,
  nombre: string
}

interface Provincias {
  provincias: Provincia[],
  size: number
}

interface Localidad {
  id: number,
  nombre: string
}

interface Localidades {
  localidades: Localidad[],
  size: number
}

interface Organismo {
  id: number,
  nombre: string,
  abreviatura: string
}

interface OrganismosPaginables {
  organismos: Organismo[],
  size: number
}

interface NuevoOrganismoForm {
  nombre: string,
  abreviatura: string
}

interface PuntoAtencion {
  id: number,
  nombre: string,
  area: Area,
  provincia: Provincia,
  localidad: Localidad,
  direccion: string,
  tramites: Tramite[],
  estado: number
}

interface NuevoPuntoAtencionForm {
  nombre: string,
  area: number,
  provincia: number,
  localidad: number,
  direccion: string,
  id: number,
  estado: number,
  tramites: number[]
}

interface PuntosAtencionPaginables {
  puntosAtencion: PuntoAtencion[],
  size: number
}

interface Area {
  id: number,
  nombre: string,
  abreviatura: string
}

interface NuevoAreaForm {
  nombre: string,
  abreviatura: string
}

interface AreasPaginables {
  areas: Area[],
  size: number
}

type AlertType = 'success' | 'info' | 'warning' | 'danger';

interface Alert {
  type: AlertType,
  header: string,
  message: string,
  icon: string,
  dismissible: boolean
}

interface NuevoOrganismoForm {
  nombre: string,
  abreviatura: string
}

interface NuevoTramiteForm {
  area: number[],
  campos: any[],
  duracion: number,
  idArgentinaGobAr: number,
  nombre: string,
  descripcion: string,
  requisitos: string[],
  requisitosAsString: string,
  visibilidad: number,
  excepcional: number,
  multiple?: number,
  multiple_max: number,
  multiple_horizonte:number,
  id: number,
  org: boolean,
  miArgentina: boolean
}

interface Tramite {
  id: number,
  nombre: string,
  descripcion: string,
  duracion: number,
  visibilidad: number,
  excepcional?: number,
  multiple?: number,
  multiple_max: number,
  multiple_horizonte:number,
  estado: string,
  campos: TramiteField[],
  org: boolean,
  punto_atencion_id?:number,
  grupo_tramite_id?:number,
  miArgentina?: boolean,
}

interface TramitesPaginables {
  tramites: Tramite[],
  size: number
}

interface TramitePda {
  id: number,
  nombre: string,
  visibilidad: boolean,
  estado: number
  grupo_tramite_id?:number
}

interface TramitesPdaPaginables {
  tramites: TramitePda[],
  size: number
}

interface Categoria {
  id: number,
  nombre: string,
  cantidadTramites: number,
  tramites: Tramite[]
}

interface Etiqueta {
  id: number,
  nombre: string,
  cantidadTramites: number,
  tramites: Tramite[]
}



interface NuevaCategoriaForm {
  nombre: string,
  id: number,
  tramites: number[]
}

interface CategoriasPaginables {
  categorias: Categoria[],
  size: number
}

interface EtiquetasPag {
etiquetas: Etiqueta[],
 size: number
}


interface GrupoTramites {
  id: number,
  nombre: string,
  horizonte: number,
  intervalo: number,
  tramites: Tramite[],
  cantidadTramites: number
}

interface GrupoTramitesPaginables {
  grupos: GrupoTramites[],
  size: number
}

interface NuevoGrupoTramitesForm {
  nombre: string,
  horizonte: number,
  intervalo: number,
  id: number,
  tramites: number[]
}

interface Rango {
  idRow: number,
  horaInicio: string,
  horaFin: string,
  diasSemana: number[]
}

type RangoHorario = string[];

interface RangosPaginables {
  rangos: Rango[],
  size: number
}

interface NuevoRangoForm {
  idRow: number,
  horaInicio: string,
  horaFin: string,
  diasSemana: number[]
}

interface Disponibilidad {
  idRow: number,
  horaInicio: string,
  horaFin: string,
  diasSemana: number[],
  cantidadTurnos: number,
  grupoTramite: number
}

interface SuccessStatus {
  id: number;
  message: string
}

interface ErrorStatus {
  message: ErrorSNT;
}

interface EntityEditionStatus {
  id?: number,
  status: string,
  message?: string
}

interface InputField {
  typeValue: TramiteFieldType
}

interface DateField {
  typeValue: TramiteFieldType
}

interface DropdownField {
  options: FieldOptions[]
}

interface TextareaField {
  rows: number
}

interface RadioButtonField {
  options: FieldOptions[]
}

interface FieldOptions {
  key: string,
  value: string
}

type FormComponent = InputField | DropdownField | TextareaField | RadioButtonField | DateField;
type FormComponentType = 'textbox' | 'dropdown' | 'textarea' | 'radio' | 'date';
type TramiteFieldType = 'text' | 'number';

interface TramiteField {
  key: string,
  label: string,
  description: string,
  formComponent: FormComponent,
  type: FormComponentType,
  order: number,
  required: boolean,
  mandatory: boolean,
  inicial?: boolean
}

interface AuthenticatedUser {
  username: string,
  token: string,
  rol: string
  organismo: number,
  puntoAtencion: number,
  area: number
}

interface BackOfficeResponse<T> {
  metadata: {resultset?: {count: number, offset: number, limit: number}};
  result: T;
}

interface BackOfficeStatusResponse {
  code: number;
  status: string;
  devMessage: string;
  userMessage: string & ErrorMessage;
  additional: { [key: string]: any };
}

interface ErrorMessage {
  errors: string[];
}

interface Usuario {
  id: number,
  nombre: string,
  apellido: string,
  usuario: string,
  rol: number,
  organismo: OrganismoUsuario,
  area: AreaUsuario,
  puntoAtencion: PuntoAtencionUsuario
}

interface OrganismoUsuario {
  id: number,
  nombre: string
}

interface AreaUsuario {
  id: number,
  nombre: string
}

interface PuntoAtencionUsuario {
  id: number,
  nombre: string
}

interface UsuariosPaginables {
  usuarios: Usuario[],
  size: number
}

interface NuevoUsuarioForm {
  id: number,
  nombre: string,
  apellido: string,
  username: string,
  rol: number,
  organismo?: number,
  area?: number,
  puntoatencion?: number
}

interface SelectorOption {
  id: number,
  nombre: string
}

type ErrorSNT = string[];

interface OrganismoAreas {
  id: number,
  nombre: string,
  areas: {
    id: number,
    nombre: string
  }[] | undefined
}

interface SessionEncryptedData {
  data: string,
  dataKey: string
}

interface ToggleEvent {
  currentValue: boolean,
  previousValue: number
}

interface ReasignacionInfo {
  totalTurnos: number;
  grupoTramites: GrupoTramiteReasignacion[];
}

interface GrupoTramiteReasignacion {
  id: number;
  nombre: string;
  totalTurnos: number;
  fechas?: { [key:string]: number}
}

type FechaElement = { [key: string]: number, cantidadAReasignar: number, totalMaximo: number };
type FechaArray = FechaElement[];
type GrupoTramiteAccordion = GrupoTramiteReasignacion & { isOpened: boolean, fechasArray: FechaArray, totalTurnosAMostrar: number, modified: boolean };


interface Formulario {
  fields: TramiteField[]
}

interface Turno {
  id: number,
  codigo: string,
  alerta: number,
  campos: {
    nombre: string,
    apellido: string,
    cuil: string,
    email: string,
    telefono: string,
    [key: string]: any,
  }
}

interface ReservaTurno {
  puntoatencion: number,
  tramite: number,
  fecha: string,
  hora: string,
  alerta: number,
  origen?: number
}

interface ReservaTurnoResponse {
  turnoId: number,
  codigo: string
}

interface ResultadoBusquedaTurno {
  id: number,
  codigo: string
  alerta: number,
  fecha: moment.Moment,
  hora: string,
  tramite: {
    id: number,
    nombre: string
  },
  estado: number,
  nombreArea: string,
  puntoAtencion: TurnosPuntoAtencion,
  turno: Turno
}

interface VisualizacionConfirmacionTurno {
  id: number,
  codigo: string,
  nombreArea: string,
  tramite: string,
  fecha: moment.Moment,
  hora: string,
  puntoAtencion: TurnosPuntoAtencion
}
interface SeleccionTurnoCriteria {
  tramiteId: number,
  provincia: Provincia,
  localidad: Localidad,
  puntoAtencion: TurnosPuntoAtencion | undefined,
  fecha: moment.Moment | undefined,
  hora: string,
  origen:number
}
interface Horario {
  fecha: moment.Moment,
  hora: string,
  disponible: boolean
}

type Requisito = string
interface Coordenada {
  latitud: number,
  longitud: number
}
interface TurnosPuntoAtencion {
  id: number,
  nombre: string,
  localidad: string,
  provincia: string,
  direccion: string,
  coordenada: Coordenada,
  disponible: boolean
}
interface TurnosTramite {
  id: number,
  nombre: string,
  area: string,
  organismo: string
}
interface TurnosTramitesPaginables {
  tramites: TurnosTramite[],
  size: number
}
interface TurnosErrorSNT {
  errors: string[]
}
interface TramitePdaForm {
  nombre: string,
  id: number,
  tramites?: Tramite[]
 }
 interface TramitePdaFormEdit {
  multiple: number,
  multiple_horizonte: number,
  multiple_max: number,
  permite_otro: number,
  permite_otro_cantidad: number,
  permite_prioridad: number,
  deshabilitar_hoy: number,
  multiturno: number,
  multiturno_cantidad: number
 }
 