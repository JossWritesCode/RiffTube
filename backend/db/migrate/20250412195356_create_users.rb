class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: :uuid do |t|
      t.string :email, null: false
      t.string :name
      t.string :password_digest
      t.string :provider
      t.string :uid
      t.datetime :deleted_at
      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :uid, unique: true
  end
end
