class CreateUserRelationships < ActiveRecord::Migration[7.0]
  def change
    create_table :user_relationships, id: :uuid do |t|
      t.uuid :from_user_id, null: false
      t.uuid :to_user_id, null: false
      t.string :relationship_type

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :user_relationships, [:from_user_id, :to_user_id, :relationship_type], unique: true, name: "index_user_relationships_unique"

  end
end
