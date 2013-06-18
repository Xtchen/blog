class CreateResumes < ActiveRecord::Migration
  def change
    create_table :resumes do |t|
    	t.string :name
    	t.text :content
    	t.boolean :show
      t.timestamps
    end
  end
end
