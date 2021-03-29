UPDATE Reg_SQMA_GPF SET Desv_F = replace(Desv_F,'DV-D','DV-X');
UPDATE Reg_SQMA_GPF SET Desv_D = replace(Desv_D,'DV-D','DV-X');
UPDATE Reg_SQMA_GPF SET Desv_E = replace(Desv_E,'DV-D','DV-X');
UPDATE Reg_SQMA_GPF SET Desv_T = replace(Desv_T,'DV-D','DV-X');

UPDATE Reg_SQMA_GPF SET Desv_F = replace(Desv_F,'DV-E','DV-D');
UPDATE Reg_SQMA_GPF SET Desv_D = replace(Desv_D,'DV-E','DV-D');
UPDATE Reg_SQMA_GPF SET Desv_E = replace(Desv_E,'DV-E','DV-D');
UPDATE Reg_SQMA_GPF SET Desv_T = replace(Desv_T,'DV-E','DV-D');

UPDATE Reg_SQMA_GPF SET Desv_F = replace(Desv_F,'DV-X','DV-E');
UPDATE Reg_SQMA_GPF SET Desv_D = replace(Desv_D,'DV-X','DV-E');
UPDATE Reg_SQMA_GPF SET Desv_E = replace(Desv_E,'DV-X','DV-E');
UPDATE Reg_SQMA_GPF SET Desv_T = replace(Desv_T,'DV-X','DV-E');