class CreateAuditLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :audit_logs, id: :uuid do |t|
      t.references :user,      null: true, foreign_key: true, type: :uuid
      t.text    :action,       null: false
      t.string  :entity_type,  null: false
      t.uuid    :entity_id,    null: false
      t.jsonb   :details
      t.timestamps
    end

    add_index :audit_logs, %i[entity_type entity_id]
  end
end
