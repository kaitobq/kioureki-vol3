class CreateInvitations < ActiveRecord::Migration[7.1]
  def change
    create_table :invitations do |t|
      t.string :token, null: false, index: { unique: true }
      t.references :organization, null: false, foreign_key: true
      t.boolean :accepted, default: false

      t.timestamps
    end
  end
end
