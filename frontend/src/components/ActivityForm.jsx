import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent
} from "@mui/material";

import { motion } from "framer-motion";
import { useState } from "react";
import { addActivity } from "../services/api";
import { FaPlusCircle } from "react-icons/fa";

const ActivityForm = ({ onActivityAdded }) => {

  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {}
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      setLoading(true);

      const res = await addActivity(activity);

      setLoading(false);

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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto"
    >

      <Card className="shadow-xl rounded-2xl">

        <CardContent className="p-8">

          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FaPlusCircle className="text-indigo-500"/>
            Log Activity
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

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

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
              sx={{
                background: "linear-gradient(45deg,#6366f1,#9333ea)",
                padding: "10px",
                fontWeight: "bold"
              }}
            >
              {loading ? "Saving..." : "Submit Activity"}
            </Button>

          </form>

        </CardContent>

      </Card>

    </motion.div>
  );
};

export default ActivityForm;