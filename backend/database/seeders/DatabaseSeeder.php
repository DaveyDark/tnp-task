<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed the user
        User::factory()->create([
            'username' => 'admin',
            'password' => 'adminadmin',
        ]);

        // Seed some sample posts for training and placement
        Post::factory()->createMany([
            [
                'title' => 'Summer Internship at TechCorp',
                'content' => "We are excited to inform all final-year B.Tech CSE students about the upcoming Summer Internship at TechCorp. This is a two-month internship program focusing on Software Development and AI.

Company Name: TechCorp Pvt. Ltd.
Location: TechCorp Campus, Bangalore
Stipend: ₹20,000 per month

Eligibility: B.Tech CSE final-year students with a minimum CGPA of 7.0.

The interview process will be conducted on 15th September 2024 at 10:00 AM in the Main Auditorium, Block A. Interested students should register by 10th September 2024.

Best regards,
TPO, Training & Placement Cell",
                'type' => 'internship',
                'tags' => 'internship,tech,summer',
            ],
            [
                'title' => 'Placement Drive for Software Engineers',
                'content' => "We are pleased to announce a Placement Drive for final-year B.Tech CSE and IT students. Leading software companies such as Infosys, Wipro, and TCS will be conducting interviews.

Date: 20th September 2024
Venue: University Placement Cell, Block B
Time: 9:00 AM onwards

Eligibility: Final-year B.Tech CSE and IT students with a CGPA of 7.5 and above. Please ensure you carry your resume, college ID, and academic certificates.

Registration Deadline: 15th September 2024.

Best regards,
Student Coordinator, T&P Cell",
                'type' => 'placement',
                'tags' => 'placement,software,drive',
            ],
            [
                'title' => 'Hackathon 2024',
                'content' => "Calling all tech enthusiasts to participate in the annual Hackathon 2024! This 24-hour coding event will challenge you to solve real-world problems using innovative solutions.

Date: 12th October 2024
Venue: Computer Science Lab, Block C
Time: 9:00 AM (12th Oct) to 9:00 AM (13th Oct)

Eligibility: Open to all B.Tech students across all branches. Teams of up to 4 participants are allowed. Prizes worth ₹1,00,000 to be won.

Register your team by 1st October 2024.

Signed,
Hackathon Coordinator",
                'type' => 'hackathon',
                'tags' => 'hackathon,coding,competition',
            ],
            [
                'title' => 'Announcement: Career Guidance Session',
                'content' => "We are organizing a Career Guidance Session for all pre-final and final-year students. The session will cover topics like job search strategies, resume building, and interview skills.

Date: 10th October 2024
Venue: Seminar Hall, Block D
Time: 11:00 AM to 1:00 PM

The session will be led by industry experts from top firms like Google, Microsoft, and Amazon. All students are encouraged to participate.

Best regards,
TPO, Training & Placement Cell",
                'type' => 'announcement',
                'tags' => 'career,guidance,session',
            ],
            [
                'title' => 'Internship Opportunity at DataSoft',
                'content' => "DataSoft Solutions is offering an internship opportunity for 2024 pass-out students in Data Science and Machine Learning.

Company Name: DataSoft Solutions
Location: Remote
Stipend: ₹25,000 per month

Eligibility: B.Tech CSE, IT, and ECE students with relevant skills in Python, Machine Learning, and Data Analysis.

Interview Date: 5th November 2024
Registration Deadline: 1st November 2024

Regards,
TPO",
                'type' => 'internship',
                'tags' => 'internship,data science,remote',
            ],
            [
                'title' => 'Campus Placement: Engineering Firms',
                'content' => "We are excited to announce a placement drive for Mechanical and Civil Engineering students. Top engineering firms will be hiring for multiple roles.

Date: 25th September 2024
Venue: Mechanical Engineering Lab, Block E
Time: 10:00 AM

Eligibility: Final-year Mechanical and Civil Engineering students with a CGPA of 6.5 and above. The interview process includes an aptitude test followed by technical interviews.

Please register by 20th September 2024.

Best regards,
TPO, Training & Placement Cell",
                'type' => 'placement',
                'tags' => 'placement,engineering,drive',
            ],
        ]);
    }
}
