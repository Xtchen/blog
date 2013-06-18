class ResumesController < ApplicationController

	before_filter :admin_validate, :only => [:new, :create, :edit, :update, :destroy]

	def index
		@resume = Resume.order("updated_at DESC").where(:show => "t").first()
	end

	def new
		@resume = Resume.new
	end

	def create
		resume = Resume.new(params[:resume])
		if resume.save
			flash[:success] = 'Resume successfully posted!'
			redirect_to resumes_path
		else
			render 'new'
		end
	end

	def edit
		@resume = Resume.find params[:id]
	end

	def update
		resume = Resume.find params[:id]
		if resume.update_attributes(params[:resume])
			flash[:success] = 'Successfully updated!'
			redirect_to resumes_path
		else
			render 'edit'
		end
	end

	def destroy
		if Resume.delete params[:id]
			flash[:success] = 'Successfully deleted!'
			redirect_to resumes_path
		else
			render 'destroy'
		end
	end
end
