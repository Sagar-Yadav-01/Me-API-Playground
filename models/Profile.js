import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    year: { type: Number, required: true },
});

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    links: [{ type: String }],
    skills: [{ type: String }],
});

const WorkSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
});

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    education: [EducationSchema],
    skills: [{ type: String }],
    projects: [ProjectSchema],
    work: [WorkSchema],
    links: {
        github: { type: String },
        linkedin: { type: String },
        portfolio: { type: String },
    },
}, { timestamps: true });

// Add indexes
ProfileSchema.index({ skills: 1 });
ProfileSchema.index({ 'projects.skills': 1 });

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
