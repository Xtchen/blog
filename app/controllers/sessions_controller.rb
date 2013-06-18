class SessionsController < ApplicationController
	def new
		
	end

	def create
		admin = Admin.find_by_name(params[:session][:name])
		if admin && admin.authenticate(params[:session][:password])
			sign_in admin
			redirect_to posts_path
		else
			flash.now[:error] = 'Invalid name/password combination'
			render 'new'
		end
	end

	def destroy
		sign_out
    	redirect_to posts_path
	end
end
