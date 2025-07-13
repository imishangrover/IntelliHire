import React from 'react';
import { Briefcase, Star } from 'lucide-react';

const JobCard = ({ job }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:scale-[1.02]">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
        <p className="text-gray-600">{job.company}</p>
        <p className="text-sm text-gray-500">{job.location}</p>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium text-gray-700">
            {(job.similarity * 100).toFixed(0)}% match
          </span>
        </div>
        <span className="text-sm text-gray-500">{job.posted}</span>
      </div>
    </div>

    <div className="mb-4">
      <p className="text-sm text-gray-600 mb-2">Required Skills:</p>
      <div className="flex flex-wrap gap-2">
        {(job.skills || []).map((skill, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-900">{job.salary}</p>
        <p className="text-xs text-gray-500">{job.type}</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Apply Now
      </button>
    </div>
  </div>
);

const JobRecommendationsView = ({ jobRecommendations }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Job Recommendations</h2>
      {jobRecommendations.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobRecommendations.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Recommendations Yet
          </h3>
          <p className="text-gray-600">
            Upload your resume to get AI-powered job recommendations
          </p>
        </div>
      )}
    </div>
  );
};

export default JobRecommendationsView;
