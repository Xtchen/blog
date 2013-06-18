class SettingsController < ApplicationController

	before_filter :admin_validate, :except => []
	def index
		@intro = Intro.first
		@links = Link.all
	end

	def update_intro
		intro = Intro.first
		if intro.update_attributes({:content => params[:intro][:content]})
			flash[:success] = 'Successfully updated!'
		else
			flash[:error] = 'Error!!!'
		end
		redirect_to settings_path
	end

	def create_link
		if Link.create(:name => params[:link][:name], :url => params[:link][:url])
			flash[:success] = 'Successfully created!'
		else
			flash[:error] = 'Error!!!'
		end
		redirect_to settings_path
	end

	def update_link
		link = Link.find(params[:link][:id])
		if link.update_attributes({:name => params[:link][:name], :url => params[:link][:url]})
			flash[:success] = 'Successfully updated!'
		else
			flash[:error] = 'Error!!!'
		end
		redirect_to settings_path
	end

	def destroy_link
		if Link.delete(params[:id])
			flash[:success] = 'Successfully deleted!'
		else
			flash[:error] = 'Error!!!'
		end
		redirect_to settings_path
	end
end
