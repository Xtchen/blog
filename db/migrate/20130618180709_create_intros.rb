class CreateIntros < ActiveRecord::Migration
  def change
    create_table :intros do |t|
    	t.text :content
      t.timestamps
    end
  end
end
