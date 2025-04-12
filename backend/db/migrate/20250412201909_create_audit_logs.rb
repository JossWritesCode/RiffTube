class CreateAuditLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :audit_logs, id: :uuid do |t|
      t.uuid :user_id, null: false
      t.text :action, null: false
      t.string :entity_type, null: false
      t.uuid :entity_id, null: false
      t.jsonb :details
      t.timestamps
    end
  end
end
