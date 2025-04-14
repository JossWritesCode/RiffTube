class CreateUserPreferences < ActiveRecord::Migration[7.0]
  def change
    create_table :user_preferences, id: :uuid do |t|
      t.uuid :user_id, null: false
      t.boolean :autosave, default: true
      t.jsonb :settings

      t.timestamps
    end

    add_index :user_preferences, :user_id, unique: true
  end
end
