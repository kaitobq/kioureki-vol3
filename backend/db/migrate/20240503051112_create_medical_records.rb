class CreateMedicalRecords < ActiveRecord::Migration[7.1]
  def change
    create_table :medical_records do |t|
      t.string :name
      t.string :part
      t.string :treatment_status
      t.text :diagnosis
      t.text :memo
      t.string :date_of_injury
      t.string :return_date
      t.references :organization, null: false, foreign_key: true

      t.timestamps
    end
  end
end
