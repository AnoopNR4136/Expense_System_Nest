import { WorkflowDetailsArray } from './wrkflow_details.dto';

export class CreateWorkflowDto {
  work_flow_id: number;

  role_id: number;

  document_id: number;

  

  workflow_details_array: Array<WorkflowDetailsArray>;
}
