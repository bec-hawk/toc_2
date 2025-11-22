# Theory of Change Builder for AI Safety & Policy

An intuitive web application to help AI safety researchers, policymakers, and organizations design, visualize, and iterate on their Theory of Change.

## What is a Theory of Change?

A Theory of Change (ToC) is a comprehensive framework that maps out how your work will create impact. It connects your day-to-day activities to your ultimate goals by identifying:

- **Impact** 🎯 - Your ultimate goal (e.g., "Reduce AI x-risk")
- **Outcomes** 📈 - Long-term changes that lead to impact (e.g., "Improved AI governance frameworks")
- **Outputs** 📦 - Direct results of your work (e.g., "Published policy recommendations")
- **Activities** ⚡ - What you actually do (e.g., "Conduct research on AI governance")
- **Inputs** 🔧 - Resources needed (e.g., "Funding, researchers, data")
- **Assumptions** 💭 - What needs to be true for your theory to work

## Features

### Visual & Intuitive Interface
- **Flow View**: See your entire theory of change at a glance with components organized in logical columns
- **List View**: Review all components in a detailed list format
- **Drag & Drop**: Easily reorganize components by dragging them between categories

### Component Management
- Add, edit, and delete components
- Track success indicators for each component
- Set timeframes to plan your work
- Add descriptions and context

### Assumptions Tracking
- Dedicated panel for tracking assumptions and risks
- Critical for identifying potential weak points in your theory

### Data Persistence
- Automatic saving to browser localStorage
- Export your ToC as JSON for backup or sharing
- Import existing ToC projects

### Responsive Design
- Works on desktop, tablet, and mobile devices
- Clean, professional interface

## Getting Started

### Installation

No installation required! Simply open `index.html` in any modern web browser.

```bash
# Clone or download the repository
git clone <repository-url>

# Open in browser (or just double-click index.html)
open index.html
```

### Quick Start Guide

1. **Name Your Project**
   - Enter a project name in the sidebar
   - Add a brief description of your initiative

2. **Start with Impact**
   - Select "Impact (Ultimate Goal)" from the dropdown
   - Click "Add Component"
   - Enter your ultimate goal (e.g., "Reduce existential risk from AI")

3. **Work Backwards**
   - Add Outcomes: What long-term changes need to happen to achieve your impact?
   - Add Outputs: What specific results will you produce?
   - Add Activities: What will you actually do?
   - Add Inputs: What resources do you need?

4. **Document Assumptions**
   - Add assumptions about what needs to be true
   - Consider risks and external factors

5. **Iterate**
   - Edit components by clicking on them
   - Drag components to reorganize
   - Add success indicators and timeframes

6. **Export & Share**
   - Click "Export JSON" to save your work
   - Share with team members or stakeholders

## Example Use Cases

### AI Safety Research Organization
- **Impact**: Reduce catastrophic risks from advanced AI systems
- **Outcomes**: AI developers adopt safety best practices; Policymakers implement safety regulations
- **Outputs**: Technical research papers; Policy recommendations; Safety evaluation frameworks
- **Activities**: Conduct technical research; Engage with policymakers; Organize workshops
- **Inputs**: Research funding; AI safety researchers; Computational resources

### AI Policy Advocacy Group
- **Impact**: Establish comprehensive AI governance frameworks
- **Outcomes**: Evidence-based AI policies enacted; Public awareness of AI risks increased
- **Outputs**: Policy briefs; Media coverage; Congressional testimony
- **Activities**: Policy research; Stakeholder engagement; Public education
- **Inputs**: Policy experts; Communication budget; Access to decision-makers

### AI Alignment Research Project
- **Impact**: Develop technical solutions for AI alignment
- **Outcomes**: Scalable alignment techniques widely adopted; Research community coordination improved
- **Outputs**: Novel alignment algorithms; Open-source tools; Research publications
- **Activities**: Theoretical research; Algorithm development; Community building
- **Inputs**: ML researchers; Computing infrastructure; Research grants

## Tips for Effective Theories of Change

### Be Specific
- Instead of "Improve AI safety", try "Reduce risks from misaligned AI systems by establishing evaluation standards"
- Vague goals make it hard to measure progress

### Test Your Logic
- Does each level logically lead to the next?
- Are there gaps in your causal chain?
- What could go wrong?

### Document Assumptions
- "Policymakers will be receptive to technical recommendations"
- "Current AI development trajectory continues"
- "Sufficient funding will be available"

### Include Timeframes
- Short-term (0-6 months)
- Medium-term (6-24 months)
- Long-term (2+ years)

### Add Measurable Indicators
- Number of policy recommendations adopted
- Citations of research papers
- Engagement metrics
- Funding secured
- Partnerships established

### Iterate Regularly
- Review quarterly
- Update based on new information
- Adjust to changing circumstances
- Learn from what's working (and what isn't)

## Technical Details

### Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

### Data Storage
- All data stored in browser localStorage
- No server required
- No external dependencies

### Privacy
- All data stays on your device
- No analytics or tracking
- No internet connection required (after initial load)

## File Structure

```
.
├── index.html      # Main application structure
├── styles.css      # All styling and visual design
├── app.js          # Application logic and interactivity
└── README.md       # This file
```

## Contributing

This is a simple, standalone application. To modify:

1. Edit `index.html` for structure changes
2. Edit `styles.css` for visual changes
3. Edit `app.js` for functionality changes

No build process required - just refresh your browser to see changes.

## License

This project is open source and available for use in AI safety and policy work.

## Support

If you encounter issues or have suggestions:
- Check browser console for errors
- Ensure you're using a modern browser
- Try clearing localStorage and refreshing

## Acknowledgments

Built to support the AI safety and policy community in creating clearer, more effective theories of change.

---

**Remember**: A Theory of Change is a living document. Update it regularly as you learn and adapt!
