class CreateAdmins < ActiveRecord::Migration
  def change
  	drop_table :admins
    create_table :admins do |t|
    	t.string :name
    	t.string :password
    	t.string :password_digest
      t.timestamps
    end
  end
end
