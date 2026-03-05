import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

const ActivityForm = ({ onActivityAdded }) => {
    const [activity , setActivity] = useState({
        type:"RUNNING",
        duration:"",
        caloriesBurned:"",
        additionalMetrics:{}
    })


    const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((prev) => ({ ...prev, [name]: value }));
  };

    const handleSubmit=async(e)=>{

        e.preventDefault();
        try {
            console.log(activity)
            // await addActivity(activity);
if (onActivityAdded) onActivityAdded();
           setActivity({
        type: "RUNNING",
        duration: "",
        caloriesBurned: "",
        additionalMetrics: {}
      });
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-lg mx-auto p-8"
    >
      <h2 className="text-2xl font-bold mb-6">Log Activity</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormControl fullWidth>
          <InputLabel>Activity Type</InputLabel>
          <Select
            name="type"
            value={activity.type}
            onChange={handleChange}
            label="Activity Type"
          >
            <MenuItem value="RUNNING">Running</MenuItem>
            <MenuItem value="CYCLING">Cycling</MenuItem>
            <MenuItem value="SWIMMING">Swimming</MenuItem>
            <MenuItem value="WALKING">Walking</MenuItem>
            <MenuItem value="OTHER">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Duration (minutes)"
          name="duration"
          type="number"
          value={activity.duration}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Calories Burned"
          name="caloriesBurned"
          type="number"
          value={activity.caloriesBurned}
          onChange={handleChange}
          fullWidth
          required
        />

        <Button type="submit" variant="contained" fullWidth>
          Submit Activity
        </Button>
      </form>
    </motion.div>
  );
};

export default ActivityForm;