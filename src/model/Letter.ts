export interface Letter {
  send_user_id: string;
  receive_user_id: string;
  title: string;
  message: string;
  send_date: string;
  is_read: boolean;
  del_at: boolean;
  report_at: boolean;
}
