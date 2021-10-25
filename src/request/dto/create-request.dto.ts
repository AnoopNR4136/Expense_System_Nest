export class CreateRequestDto {
  employee_id: string; //posted user

  document_id: number;

  notes: string;

  to_employee_id: string;
}
export class RequestDetailsDTO {
  requestdetailsID: number;

  request_id: number;

  from_employee_id: string;

  to_employee_id: string;

  notes: string;

  permission_id: number;

  action: number;
}
