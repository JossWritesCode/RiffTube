class CreateCollaborations < ActiveRecord::Migration[7.0]
  def change
    create_table :collaborations, id: :uuid do |t|
      t.uuid :user_id, null: false
      t.uuid :project_id, null: false
      t.uuid :role_id, null: false

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :collaborations, [:user_id, :project_id], unique: true
  end
end
