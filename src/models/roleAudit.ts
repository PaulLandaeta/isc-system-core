import Rol from './rol';

interface RoleAudit extends Rol {
  changed_by: string;
  changed_at: Date;
}

export default RoleAudit;