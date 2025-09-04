// App.js
import React, { useState, useEffect } from "react";
import "./App.css";


const API_URL = process.env.REACT_APP_URL;

export default function Portfolio() {
  const [isEditing, setIsEditing] = useState(false);
  const [searchSkill, setSearchSkill] = useState("");
  const [searchProject, setSearchProject] = useState("");
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/profile`);
      const data = await res.json();

      const normalized = {
        ...data,
        skills: {
          languages: data.skills?.languages || [],
          dsa: data.skills?.dsa || "",
          frontend: data.skills?.frontend || [],
          backend: data.skills?.backend || [],
          database: data.skills?.database || [],
        },
        certifications: data.certifications || [],
        education: data.education || [],
        experience: data.experience || [],
        projects: data.projects || [],
      };

      setProfile(normalized);
      setFormData(normalized);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleEdit = async () => {
    if (isEditing) {
      try {
        await fetch(`${API_URL}/profile/${profile._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setProfile(formData);
      } catch (err) {
        console.error("Save error:", err);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handles both array-of-objects (education/experience/projects) and array-of-strings (certifications)
  const handleNestedChange = (section, index, key, value) => {
    const updated = [...(formData[section] || [])];
    if (key == null) {
      // For sections like certifications which are arrays of strings
      updated[index] = value;
    } else {
      updated[index] = { ...(updated[index] || {}), [key]: value };
    }
    setFormData({ ...formData, [section]: updated });
  };

  const addArrayItem = (section, template) => {
    setFormData({
      ...formData,
      [section]: [...(formData[section] || []), template],
    });
  };

  const removeArrayItem = (section, index) => {
    const updated = (formData[section] || []).filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updated });
  };

  const handleSkillChange = (category, index, value) => {
    const updated = [...(formData.skills?.[category] || [])];
    updated[index] = value;
    setFormData({
      ...formData,
      skills: { ...formData.skills, [category]: updated },
    });
  };

  const addSkillItem = (category) => {
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [category]: [...(formData.skills?.[category] || []), ""],
      },
    });
  };

  const removeSkillItem = (category, index) => {
    const updated = [...(formData.skills?.[category] || [])];
    updated.splice(index, 1);
    setFormData({
      ...formData,
      skills: { ...formData.skills, [category]: updated },
    });
  };

  const allSkillsFlattened = [
    ...(formData?.skills?.languages || []),
    formData?.skills?.dsa || "",
    ...(formData?.skills?.frontend || []),
    ...(formData?.skills?.backend || []),
    ...(formData?.skills?.database || []),
  ].filter(Boolean);

  const filteredSkills = allSkillsFlattened.filter((skill) =>
    skill.toLowerCase().includes(searchSkill.toLowerCase())
  );

  const filteredProjects = (formData?.projects || []).filter((p) => {
    const search = searchProject.toLowerCase();
    return (
      (p.name || "").toLowerCase().includes(search) ||
      (Array.isArray(p.description)
        ? p.description.join(" ").toLowerCase()
        : (p.description || "").toLowerCase()
      ).includes(search) ||
      (Array.isArray(p.technologies)
        ? p.technologies.join(" ").toLowerCase()
        : (p.technologies || "").toLowerCase()
      ).includes(search) ||
      (p.deployment || "").toLowerCase().includes(search)
    );
  });

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>About Me</h1>
          <button
            onClick={handleEdit}
            className={`btn ${isEditing ? "save" : "edit"}`}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {isEditing ? (
          <div className="form-grid">
            {/* Profile Info */}
            <input
              placeholder="Name"
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <input
              placeholder="Email"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <input
              placeholder="Phone"
              value={formData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <textarea
              placeholder="Summary"
              value={formData.summary || ""}
              onChange={(e) => handleChange("summary", e.target.value)}
            />

            {/* Skills */}
            <h3>Skills</h3>
            {["languages", "frontend", "backend", "database"].map((cat) => (
              <div className="skill-section" key={cat}>
                <strong>{cat.toUpperCase()}</strong>
                {(formData.skills[cat] || []).map((s, i) => (
                  <div className="input-row" key={`${cat}-${i}`}>
                    <input
                      value={s}
                      onChange={(e) =>
                        handleSkillChange(cat, i, e.target.value)
                      }
                    />
                    <button
                      className="btn delete"
                      onClick={() => removeSkillItem(cat, i)}
                    >
                      X
                    </button>
                  </div>
                ))}
                <button className="btn add" onClick={() => addSkillItem(cat)}>
                  Add {cat}
                </button>
              </div>
            ))}
            <div>
              <strong>DSA / Concepts</strong>
              <input
                value={formData.skills.dsa || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: { ...formData.skills, dsa: e.target.value },
                  })
                }
              />
            </div>

            {/* Projects */}
            <h3>Projects</h3>
            {(formData.projects || []).map((proj, i) => (
              <div className="section" key={`proj-${i}`}>
                <input
                  placeholder="Project Name"
                  value={proj.name || ""}
                  onChange={(e) =>
                    handleNestedChange("projects", i, "name", e.target.value)
                  }
                />
                <textarea
                  placeholder="Description"
                  value={(proj.description || []).join(", ")}
                  onChange={(e) =>
                    handleNestedChange(
                      "projects",
                      i,
                      "description",
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                />
                <input
                  placeholder="Technologies"
                  value={(proj.technologies || []).join(", ")}
                  onChange={(e) =>
                    handleNestedChange(
                      "projects",
                      i,
                      "technologies",
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                />
                <input
                  placeholder="Deployment URL"
                  value={proj.deployment || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "projects",
                      i,
                      "deployment",
                      e.target.value
                    )
                  }
                />
                <button
                  className="btn delete"
                  onClick={() => removeArrayItem("projects", i)}
                >
                  Remove Project
                </button>
              </div>
            ))}
            <button
              className="btn add"
              onClick={() =>
                addArrayItem("projects", {
                  name: "",
                  description: [],
                  technologies: [],
                  deployment: "",
                })
              }
            >
              Add Project
            </button>

            {/* Education */}
            <h3>Education</h3>
            {(formData.education || []).map((edu, i) => (
              <div className="section" key={`edu-${i}`}>
                <input
                  placeholder="Institution"
                  value={edu.institution || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "education",
                      i,
                      "institution",
                      e.target.value
                    )
                  }
                />
                <input
                  placeholder="Degree"
                  value={edu.degree || ""}
                  onChange={(e) =>
                    handleNestedChange("education", i, "degree", e.target.value)
                  }
                />
                <input
                  placeholder="Board"
                  value={edu.board || ""}
                  onChange={(e) =>
                    handleNestedChange("education", i, "board", e.target.value)
                  }
                />
                <input
                  placeholder="Start Date"
                  value={edu.startDate || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "education",
                      i,
                      "startDate",
                      e.target.value
                    )
                  }
                />
                <input
                  placeholder="End Date"
                  value={edu.endDate || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "education",
                      i,
                      "endDate",
                      e.target.value
                    )
                  }
                />
                <input
                  placeholder="CGPA"
                  value={edu.cgpa || ""}
                  onChange={(e) =>
                    handleNestedChange("education", i, "cgpa", e.target.value)
                  }
                />
                <button
                  className="btn delete"
                  onClick={() => removeArrayItem("education", i)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="btn add"
              onClick={() =>
                addArrayItem("education", {
                  institution: "",
                  degree: "",
                  board: "",
                  startDate: "",
                  endDate: "",
                  cgpa: "",
                  percentage: "",
                })
              }
            >
              Add Education
            </button>

            {/* Experience */}
            <h3>Experience</h3>
            {(formData.experience || []).map((exp, i) => (
              <div className="section" key={`exp-${i}`}>
                <input
                  placeholder="Company"
                  value={exp.company || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "experience",
                      i,
                      "company",
                      e.target.value
                    )
                  }
                />
                <input
                  placeholder="Role"
                  value={exp.role || ""}
                  onChange={(e) =>
                    handleNestedChange("experience", i, "role", e.target.value)
                  }
                />
                <textarea
                  placeholder="Responsibilities"
                  value={(exp.responsibilities || []).join(", ")}
                  onChange={(e) =>
                    handleNestedChange(
                      "experience",
                      i,
                      "responsibilities",
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                />
                <button
                  className="btn delete"
                  onClick={() => removeArrayItem("experience", i)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="btn add"
              onClick={() =>
                addArrayItem("experience", {
                  company: "",
                  role: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  responsibilities: [],
                })
              }
            >
              Add Experience
            </button>

            {/* Certifications */}
            <h3>Certifications</h3>
            {(formData.certifications || []).map((cert, i) => (
              <div className="input-row" key={`cert-${i}`}>
                <input
                  value={cert}
                  onChange={(e) =>
                    handleNestedChange(
                      "certifications",
                      i,
                      null,
                      e.target.value
                    )
                  }
                />
                <button
                  className="btn delete"
                  onClick={() => removeArrayItem("certifications", i)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="btn add"
              onClick={() => addArrayItem("certifications", "")}
            >
              Add Certification
            </button>
          </div>
        ) : (
          <div className="view-section">
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Phone:</strong> {profile.phone}
            </p>
            <p>
              <strong>Summary:</strong> {profile.summary}
            </p>

            <h3>Skills</h3>
            <input
              placeholder="Search Skills..."
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
            />
            <div className="tags">
              {filteredSkills.map((s, i) => (
                <span className="tag" key={`skill-${i}`}>
                  {s}
                </span>
              ))}
            </div>

            <h3>Projects</h3>
            <input
              placeholder="Search Projects..."
              value={searchProject}
              onChange={(e) => setSearchProject(e.target.value)}
            />
            <ul>
              {filteredProjects.map((proj, i) => (
                <li key={`projview-${i}`}>
                  <strong>{proj.name}</strong> -{" "}
                  {(proj.technologies || []).join(", ")}
                  <p>{(proj.description || []).join(", ")}</p>
                  {proj.deployment && (
                    <a href={proj.deployment} target="_blank" rel="noreferrer">
                      {proj.deployment}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <h3>Education</h3>
            <ul>
              {(profile.education || []).map((edu, i) => (
                <li key={`eduview-${i}`}>
                  {edu.degree} at {edu.institution} ({edu.startDate} -{" "}
                  {edu.endDate})
                </li>
              ))}
            </ul>

            <h3>Experience</h3>
            <ul>
              {(profile.experience || []).map((exp, i) => (
                <li key={`expview-${i}`}>
                  {exp.role} at {exp.company} ({exp.startDate} - {exp.endDate})
                </li>
              ))}
            </ul>

            <h3>Certifications</h3>
            <ul>
              {(profile.certifications || []).map((c, i) => (
                <li key={`certview-${i}`}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      
    </div>
  );
}
