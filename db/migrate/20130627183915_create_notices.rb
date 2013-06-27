class CreateNotices < ActiveRecord::Migration
  def change
    create_table :notices do |t|
    	t.integer :comment_id
    	t.boolean :active
      t.timestamps
    end
  end
end
